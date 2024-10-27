# 👻 ClearCash: AI-Enhanced Budgeting with a Spooky Twist 🎃
Google Drive Link for Video Presentation: https://drive.google.com/drive/folders/1hNVGhp8vlVDIttX84P1mFuoejeuO0N9T?usp=sharing
*Empowering Texas Teachers and Students through AI-driven Financial Guidance*

Welcome to **ClearCash**, an AI-powered budgeting tool developed during **UNTHackathon 2024**! ClearCash is more than just a budgeting app; it's a comprehensive, LLM-dominant solution that harnesses the power of large language models (LLMs) to deliver personalized, real-time financial insights. Designed with a Halloween-inspired theme, ClearCash brings spooky fun to the serious task of financial planning, empowering Texas teachers and students to make informed financial decisions.

## 👾 Why LLMs?  
ClearCash leverages LLMs to provide users with intelligent, customized financial advice. By integrating advanced language models, ClearCash goes beyond traditional budgeting apps, dynamically adapting to users' financial data and offering suggestions to optimize their budgets, track retirement goals, and manage expenses.

---

## 🎉 Key Features

### **LLM-Driven Financial Insights**
Our primary innovation lies in ClearCash’s use of LLMs to analyze user data and provide actionable insights. Users receive real-time, AI-driven suggestions that are tailored to their unique spending habits, income patterns, and financial goals, making ClearCash an intuitive financial advisor.

### **Customized Learning Paths**
ClearCash’s **learning path** feature, powered by AI, categorizes financial tips based on users' needs and experience levels. Teachers receive targeted advice on retirement planning with TRS, 403(b), and IRAs, while students can access beginner-friendly budgeting guidance. This approach ensures that ClearCash’s recommendations are not only relevant but also accessible and practical.

### **Real-Time Notifications and Budget Alerts**
Through AI, ClearCash proactively notifies users of any overspending or unmet financial goals. These real-time notifications are powered by LLMs, making them highly responsive to changing patterns and empowering users to stay on top of their finances effortlessly.

### **Data Security and Privacy**
ClearCash takes data privacy seriously. We’ve implemented secure, encrypted protocols for user data storage and retrieval, ensuring that sensitive financial information remains private while being accessible for LLM processing.

---

## 🔮 Tech Stack

| Component       | Technology                         |
|-----------------|------------------------------------|
| **Frontend**    | React, Tailwind CSS, StreamLit            |
| **Backend**     | Flask (Python), SQL                |
| **LLM Integration** | Language Model APIs, Custom Agents  |
| **Notifications & Alerts** | Real-time AI-powered prompts |
| **Data Storage**| MySQL                              |

> **Note**: ClearCash uses advanced LLMs to tailor each user's financial journey, making the app both intelligent and intuitive.

---

## 🚀 Getting Started

1. **Clone the Repository**:
    ```bash
    git clone <repository-link>
    cd clearcash
    ```

2. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3. **Set Up MySQL Database**:
   - Update `db_config` in `app.py` with your MySQL credentials.
   - Run the server to auto-create tables (`user` and `ExpenseLog`).

4. **Start the Server**:
    ```bash
    python app.py
    ```

---

## 📬 API Endpoints

ClearCash offers a range of endpoints to manage data and provide insights:

- **POST /signup** – Register a new user.
- **POST /login** – Authenticate and access your dashboard.
- **GET /dashboard/<user_id>** – Access a personalized, AI-driven financial overview.
- **POST /expense** – Log expenses in the `ExpenseLog`.
- **GET /RetirementPlan** – Receive real-time savings insights and suggestions from LLMs.

---

## 👻 How It Works

1. **Teachers**: ClearCash assists teachers in managing retirement funds, providing real-time LLM-driven insights on retirement goals and recommended contributions.
2. **Students**: ClearCash offers students budgeting advice that grows with their experience, using AI to create learning paths and improve financial literacy.
3. **Notifications**: With LLMs, ClearCash identifies patterns, detects anomalies, and alerts users to help them stay on track with spending and savings goals.

---

Google Drive Link for Video Presentation: https://drive.google.com/drive/folders/1hNVGhp8vlVDIttX84P1mFuoejeuO0N9T?usp=sharing
