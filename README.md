# 📊 Teacher & Student Budgeting Tool 🧑‍🏫🎒  
*Empowering Texas Teachers & Students to Achieve Financial Wellness*  

Welcome to our project developed for **UNTHackathon 2024**! We created a tool to simplify financial planning and budgeting for two unique groups: teachers and students. From managing retirement contributions to automated expense tracking, this project aims to make financial wellness accessible, insightful, and easy to manage.

## 🔥 Project Highlights
### 🎓 Built for Texas Teachers
Helping teachers navigate and plan their financial future:
- **Multi-Source Retirement Planning**: Integrates **TRS, 403(b), and IRA** accounts for a comprehensive view.
- **Long-Term Savings Plan**: Calculates personalized monthly savings required to achieve retirement goals.
- **Financial Health Dashboard**: Showcases monthly income, fixed and variable expenses, and current savings toward retirement.

### 💰 Automated Expense Tracker for Students
Saving time and encouraging smart money management for students:
- **Expense Categorization**: Instantly log expenses in categories like **Food, Clothing, Logistics, and Miscellaneous**.
- **Savings & Suggestions**: Displays savings goals and provides tips to help students stick to their budget.
- **Dashboard Overview**: A clear summary of monthly spending and remaining savings.

---

## 🛠 Tech Stack

| Tool/Technology   | Role                          |
|-------------------|-------------------------------|
| **Flask (Python)**| Backend framework and server  |
| **MySQL**         | Database for user & expense data |
| **CORS**          | Cross-Origin Resource Sharing |
| **Flask Templates** | Frontend rendering |

> **Note**: Set up instructions for the database are included below.

---

## 🚀 Getting Started

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository
```bash
git clone <repository-link>
cd budgeting-tool

### 2. Install Dependencies
```bash
pip install -r requirements.txt

### 3. Set Up MySQL Database
Update db_config in app.py with your MySQL credentials.
Run the server to auto-create tables (user and ExpenseLog).

### 4. Start the Server
```bash
python app.py


## 📬 API Endpoints

Explore these endpoints for full functionality:

- **POST /signup** - Register a new user.
- **POST /login** - Authenticate and access your dashboard.
- **GET /dashboard/<user_id>** - View personalized financial metrics and goals.
- **POST /expense** - Log expenses to the `ExpenseLog`.
- **GET /calculate_savings/<user_id>** - View monthly savings insights and suggestions.


## 🎉 How It Works

### Teachers
- **Sign Up and Set Goals**: Add monthly income, fixed and variable expenses, and choose retirement contributions (TRS, 403(b), or IRA).
- **Dashboard Insights**: Get savings recommendations based on income and retirement goals, along with monthly updates.

### Students
- **Automate Your Expenses**: Log and categorize expenses quickly.
- **Stay on Track**: Review your expenses and savings to manage your budget effortlessly.


## 🌱 Contributing

We welcome contributions to expand and enhance the tool! Please fork the repository, open issues, and submit pull requests.


💼 Authors & Acknowledgments
Thank you to all our mentors, collaborators, and everyone who provided feedback during UNTHackathon 2024!
