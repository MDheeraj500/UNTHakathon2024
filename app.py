from flask import Flask, render_template, request, redirect, url_for, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

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
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    age = data.get("age")
    occupation = data.get("occupation")
    monthly_income = data.get("monthly_income")
    savings_goal = data.get("savings_goal")
    fixed_expenses = data.get("fixed_expenses")
    variable_expenses = data.get("variable_expenses")
    is_TRS = data.get("is_TRS", False)
    TRS_amt = data.get("TRS_amt", 0)
    is_403b = data.get("is_403b", False)
    _403b_amt = data.get("403b_amt", 0)
    is_IRA = data.get("is_IRA", False)
    IRA_amt = data.get("IRA_amt", 0)
    Retirement_age_goal = data.get("Retirement_age_goal")

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

        # Check if the user is found
        if user:
            return jsonify({"message": "Login successful!"}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == '__main__':
    app.run(debug=True)