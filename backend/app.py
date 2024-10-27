from flask import Flask, render_template, request, redirect, url_for, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database connection configuration
db_config = {
    'host': 'localhost',      # Replace with your MySQL server host
    'user': 'root',  # Replace with your MySQL username
    'password': 'root',  # Replace with your MySQL password
    'database': 'hackathon_db'   # Replace with the database name you want to connect to
}

# SQL query to create the 'user' table
create_user_table_query = """
CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT,
    occupation VARCHAR(50),
    monthly_income DECIMAL(10, 2),
    savings_goal DECIMAL(10, 2),
    fixed_expenses DECIMAL(10, 2),
    variable_expenses DECIMAL(10, 2),
    is_TRS BOOLEAN DEFAULT FALSE,
    TRS_amt DECIMAL(10, 2),
    is_403b BOOLEAN DEFAULT FALSE,
    403b_amt DECIMAL(10, 2),
    is_IRA BOOLEAN DEFAULT FALSE,
    IRA_amt DECIMAL(10, 2),
    Retirement_age_goal INT
);
"""

# SQL query to create the 'ExpenseLog' table
create_expenselog_table_query = """
CREATE TABLE IF NOT EXISTS ExpenseLog (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(100),
    date DATE NOT NULL,
    category ENUM('Food', 'Clothing', 'Logistics', 'Miscellaneous') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);
"""
#Creating a function to create tables
def create_table(query, table_name):
    """Creates a table if it does not exist."""
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Check if the table already exists
        cursor.execute(f"SHOW TABLES LIKE '{table_name}'")
        result = cursor.fetchone()

        if result:
            print(f"Table '{table_name}' already exists.")
        else:
            # Create the table if it doesn't exist
            cursor.execute(query)
            conn.commit()
            print(f"Table '{table_name}' created successfully.")

    except Error as e:
        print(f"Error: {e}")
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

import math

# Define the calculation logic
def calculate_monthly_savings(user_data):
    # Input data
    fixed_expenses = user_data['fixed_expenses'] or 0
    variable_expenses = user_data['variable_expenses'] or 0
    monthly_income = user_data['monthly_income'] or 0
    trs_amt = user_data['TRS_amt'] or 0
    _403b_amt = user_data['403b_amt'] or 0
    ira_amt = user_data['IRA_amt'] or 0
    retirement_age_goal = user_data['Retirement_age_goal']
    current_age = user_data['age']

    # Constants for calculation
    annual_return_rate = 0.06  # Assuming 6% annual growth
    monthly_return_rate = annual_return_rate / 12
    years_to_retirement = retirement_age_goal - current_age
    total_months = years_to_retirement * 12

    # Monthly retirement expenses
    target_retirement_savings = 300 * (fixed_expenses + variable_expenses)

    # Calculate required monthly savings
    try:
        monthly_long_term_savings = (monthly_return_rate / (math.pow(1 + monthly_return_rate, total_months) - 1)) * target_retirement_savings
    except ZeroDivisionError:
        monthly_long_term_savings = target_retirement_savings / total_months  # fallback if zero division error

    # Available savings based on income
    available_savings = monthly_income - (fixed_expenses + variable_expenses)

    # Feasible savings amount
    feasible_savings = min(monthly_long_term_savings, available_savings)
    result = {
        "required_monthly_savings": round(float(monthly_long_term_savings), 2),
        "feasible_savings": round(float(feasible_savings), 2),
        "suggestion": "Increase contributions or reduce expenses" if feasible_savings < monthly_long_term_savings else "Savings goal is achievable"
    }
    return result


# Define a simple route
@app.route("/")
def setup_database():
    conn = None
    try:
        # Establishing the connection
        conn = mysql.connector.connect(**db_config)
        if conn.is_connected():
            cursor = conn.cursor()
            
            # Create the 'user' table if it does not exist
            cursor.execute(create_user_table_query)
            print("Table 'user' checked/created successfully.")
            
            # Create the 'ExpenseLog' table if it does not exist
            cursor.execute(create_expenselog_table_query)
            print("Table 'ExpenseLog' checked/created successfully.")
            
            return "Tables 'user' and 'ExpenseLog' created if they did not exist."
    except Error as err:
        return f"Error: {err}"
    finally:
        if conn and conn.is_connected():
            conn.close()
            
@app.route("/signup", methods=["POST"])
def signup():
    # Get data from the request body
    data = request.json
    print(data)
    username = data.get("fullname")
    email = data.get("email")
    password = data.get("password")
    age = data.get("age")
    occupation = data.get("occupation")
    monthly_income = data.get("monthlyIncome")
    savings_goal = data.get("monthlySavingGoal")
    fixed_expenses = data.get("fixedExpense")
    variable_expenses = data.get("personalExpenseTarget")
    is_TRS = data.get("trsChecked", False)
    TRS_amt = data.get("trsAmount", 0)
    is_403b = data.get("b403Checked", False)
    _403b_amt = data.get("b403Amount", 0)
    is_IRA = data.get("traChecked", False)
    IRA_amt = data.get("traAmount", 0)
    Retirement_age_goal = data.get("retirementAgeGoal")

    # Check for required fields
    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are required"}), 400

    # Database insertion
    conn = None
    try:
        # Establishing the connection
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        
        # Insert user data into the database
        insert_query = """
        INSERT INTO user (username, email, password, age, occupation, monthly_income, 
        savings_goal, fixed_expenses, variable_expenses, is_TRS, TRS_amt, is_403b, 403b_amt, 
        is_IRA, IRA_amt, Retirement_age_goal)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (username, email, password, age, occupation, 
                        monthly_income, savings_goal, fixed_expenses, variable_expenses, 
                        is_TRS, TRS_amt, is_403b, _403b_amt, is_IRA, IRA_amt, Retirement_age_goal))
        conn.commit()

        # Send success response
        return jsonify({"message": "User has been registered!!"}), 201

    except Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


# Route to login a user
@app.route("/login", methods=["POST"])
def login():
    # Get data from the request body
    data = request.json
    email = data.get("email")
    password = data.get("password")
    print(data)
    # Check for required fields
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Database query to verify user
    conn = None
    try:
        # Establishing the connection
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)  # Using dictionary=True to fetch results as dictionaries

        # Query to check if the user exists and verify the password
        query = "SELECT * FROM user WHERE email = %s AND password = %s"
        cursor.execute(query, (email, password))
        user = cursor.fetchone()
        print(user)

        # Check if the user is found
        if user:
            # Return the user_id to the frontend on successful login
            return jsonify({"message": "Login successful!", "user_id": user["user_id"]}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route("/dashboard/<int:user_id>", methods=["GET"])
def dashboard(user_id):
    """Fetches financial data for the user and returns calculated dashboard metrics."""
    
    # Database query to fetch user financial data
    conn = None
    try:
        # Establishing the connection
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)  # Fetch results as dictionaries
        
        # Query to fetch financial details for the user
        query = """
        SELECT monthly_income, fixed_expenses, variable_expenses AS personal_expenses,
               savings_goal, TRS_amt, 403b_amt, IRA_amt
        FROM user
        WHERE user_id = %s
        """
        cursor.execute(query, (user_id,))
        user_data = cursor.fetchone()

        # Check if user data is found
        if not user_data:
            return jsonify({"error": "User not found"}), 404

        # Perform calculations for the dashboard
        fixed_expenses = user_data['fixed_expenses']
        personal_expenses = user_data['personal_expenses']
        retirement_savings = user_data['TRS_amt'] + user_data['IRA_amt'] + user_data['403b_amt']
        current_savings = user_data['monthly_income'] - (fixed_expenses + personal_expenses + retirement_savings)

        # need to check for the edge case when the sum of the three expenses is more than the monthly income

        # Prepare the dashboard data
        dashboard_data = {
            "fixed_expenses": fixed_expenses,
            "current_savings": current_savings,
            "personal_expenses": personal_expenses,
            "retirement_savings": retirement_savings
        }

        # Send calculated dashboard data as JSON response
        return jsonify(dashboard_data), 200

    except Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

@app.route("/expense", methods=["POST"])
def add_expense():
    """Adds a new expense entry to the ExpenseLog table."""

    # Get data from the request body
    data = request.json
    user_id = data.get("user_id")
    amount = data.get("amount")
    description = data.get("description")
    date = data.get("date")
    category = data.get("category")

    # Check for required fields
    if not user_id or not amount or not date or not category:
        return jsonify({"error": "User ID, amount, date, and category are required"}), 400

    # Database insertion
    conn = None
    try:
        # Establishing the connection
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # SQL query to insert a new expense into ExpenseLog
        insert_query = """
        INSERT INTO ExpenseLog (user_id, amount, description, date, category)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (user_id, amount, description, date, category))
        conn.commit()

        # Send success response
        return jsonify({"message": "Expense added successfully!"}), 201

    except Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

# API endpoint for calculating savings
@app.route('/calculate_savings/<int:user_id>', methods=['GET'])
def calculate_savings(user_id):
    conn = None
    try:
        # Establish database connection
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Fetch user data
        cursor.execute("SELECT * FROM user WHERE user_id = %s", (user_id,))
        user_data = cursor.fetchone()

        if not user_data:
            return jsonify({"error": "User not found"}), 404

        # Perform the calculation
        result = calculate_monthly_savings(user_data)

        return jsonify(result)

    except Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


@app.route("/LogAnalysis", methods=["GET"])
def get_LogAnalysis():
    """Fetch data for dashboard charts."""
    
    conn = None
    try:
        # Establish the database connection
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Query 1: All Categories Bar Chart
        cursor.execute("""
            SELECT category, SUM(amount) AS total_amount
            FROM ExpenseLog
            GROUP BY category
            ORDER BY total_amount DESC;
        """)
        all_categories_data = cursor.fetchall()

        # Query 2: Expense Trend Over Time (Line Chart)
        cursor.execute("""
            SELECT DATE_FORMAT(date, '%Y-%m') AS month, SUM(amount) AS total_expense
            FROM ExpenseLog
            GROUP BY month
            ORDER BY month;
        """)
        expense_trend_data = cursor.fetchall()

        # Query 3: Expense Category Distribution (Pie Chart)
        cursor.execute("""
             SELECT category, 
           SUM(amount) AS total_amount, 
           (SUM(amount) / (SELECT SUM(amount) FROM ExpenseLog) * 100) AS percentage
    FROM ExpenseLog
    GROUP BY category;
        """)
        category_distribution_data = cursor.fetchall()

        # Query 4: Monthly Expense Area Chart
        cursor.execute("""
            SELECT DATE_FORMAT(date, '%Y-%m') AS month, category, SUM(amount) AS total_amount
            FROM ExpenseLog
            GROUP BY month, category
            ORDER BY month, category;
        """)
        monthly_expense_area_data = cursor.fetchall()

        # Prepare the response data
        dashboard_data = {
            "all_categories": all_categories_data,
            "expense_trend": expense_trend_data,
            "category_distribution": category_distribution_data,
            "monthly_expense_area": monthly_expense_area_data
        }

        print(dashboard_data)

        return jsonify(dashboard_data), 200

    except Error as err:
        print(f"Error fetching dashboard data: {err}")
        return jsonify({"error": str(err)}), 500
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()


if __name__ == '__main__':
    app.run(debug=True)