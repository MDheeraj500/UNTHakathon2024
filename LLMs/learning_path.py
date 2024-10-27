import streamlit as st
import json
from dotenv import load_dotenv
from agents import ChatbotAgent, SummaryAgent #FlashcardAgent
from utils import get_agent
import tempfile
import os

def determine_user_level(user_info):
    """Determine user's proficiency level based on their assessment scores"""
    scores = [
        user_info['knowledge_assessment']['budgeting_level'],
        user_info['knowledge_assessment']['savings_awareness'],
        user_info['knowledge_assessment']['credit_management'],
        user_info['knowledge_assessment']['investment_exp'],
        user_info['knowledge_assessment']['financial_planning']
    ]
    avg_score = sum(scores) / len(scores)
    
    if avg_score <= 2:
        return "beginner"
    elif avg_score <= 3.5:
        return "intermediate"
    else:
        return "advanced"

def get_learning_topics(level):
    """Get topics based on user's proficiency level"""
    topics = {
        "beginner": {
            "Budgeting Basics": [
                "Creating Your First Budget",
                "50/30/20 Rule of Budgeting",
                "Tracking Expenses Effectively",
                "Setting Financial Goals",
                "Managing Daily Expenses"
            ],
            "Saving Fundamentals": [
                "Emergency Fund Basics",
                "Saving vs. Spending",
                "Basic Interest Concepts",
                "Setting Saving Goals",
                "Introduction to Banking"
            ],
            "Financial Literacy": [
                "Understanding Income",
                "Basic Financial Terms",
                "Banking Account Types",
                "Introduction to Credit",
                "Money Management Basics"
            ]
        },
        "intermediate": {
            "Advanced Budgeting": [
                "Zero-Based Budgeting",
                "Digital Budgeting Tools",
                "Budget Analysis & Adjustment",
                "Lifestyle Inflation Management",
                "Irregular Income Budgeting"
            ],
            "Investment Basics": [
                "Investment Vehicle Types",
                "Risk vs. Return",
                "Diversification Basics",
                "Retirement Account Types",
                "Dollar-Cost Averaging"
            ],
            "Credit Building": [
                "Credit Score Factors",
                "Credit Card Management",
                "Debt Management Strategies",
                "Credit Report Analysis",
                "Interest Rate Optimization"
            ]
        },
        "advanced": {
            "Investment Strategies": [
                "Portfolio Management",
                "Asset Allocation",
                "Tax-Efficient Investing",
                "Alternative Investments",
                "Market Analysis Basics"
            ],
            "Retirement Planning": [
                "Retirement Portfolio Strategy",
                "Social Security Planning",
                "Pension & Benefits",
                "Required Minimum Distributions",
                "Estate Planning Basics"
            ],
            "Wealth Building": [
                "Real Estate Investment",
                "Business Investment",
                "Tax Strategy",
                "Wealth Preservation",
                "Legacy Planning"
            ]
        }
    }
    return topics.get(level, {})

def render_learning_content(topic, subtopic, learning_mode):
    st.markdown(f"### {topic}: {subtopic}")
    
    with st.expander("🎯 Learning Objectives"):
        st.write("After completing this module, you will understand:")
        learning_agent = get_agent("learning")
        objectives = learning_agent.get_learning_objectives(topic, subtopic)
        for obj in objectives:
            st.write(f"- {obj}")
    
    # Content based on learning mode
    if learning_mode == "Visual":
        with st.expander("📊 Visual Learning Content"):
            st.write("Visual representations and diagrams:")
            content = learning_agent.get_visual_content(topic, subtopic)
            st.markdown(content)
            
    elif learning_mode == "Reading/Writing":
        with st.expander("📚 Reading Materials"):
            content = learning_agent.get_reading_content(topic, subtopic)
            st.markdown(content)
            
    elif learning_mode == "Practical Examples":
        with st.expander("💡 Practical Examples"):
            examples = learning_agent.get_practical_examples(topic, subtopic)
            for i, example in enumerate(examples, 1):
                st.markdown(f"**Example {i}:**\n{example}")
    
    # Interactive Q&A section
    with st.expander("❓ Questions & Answers"):
        st.write("Ask questions about this topic:")
        if question := st.text_input(f"Your question about {subtopic}", key=f"q_{topic}_{subtopic}"):
            with st.spinner("Finding answer..."):
                answer = learning_agent.get_topic_specific_answer(topic, subtopic, question)
                st.markdown(answer)

def render_learning_path():
    st.title("📚 Financial Learning Path")
    
    # Get user's level and preferences
    user_level = determine_user_level(st.session_state.user_info)
    learning_mode = st.session_state.user_info['learning_preferences']
    
    # Display user's learning profile
    st.info(f"""
        🎓 Your Learning Profile:
        - Level: {user_level.title()}
        - Preferred Learning Style: {learning_mode}
    """)
    
    # Get topics for user's level
    topics = get_learning_topics(user_level)
    
    # Create tabs for each main topic category
    if topics:
        tabs = st.tabs(list(topics.keys()))
        
        for tab, (topic, subtopics) in zip(tabs, topics.items()):
            with tab:
                st.header(f"{topic}")
                st.markdown("Select a subtopic to begin learning:")
                
                # Create selectbox for subtopics
                selected_subtopic = st.selectbox(
                    "Choose your topic",
                    subtopics,
                    key=f"select_{topic}"
                )
                
                if selected_subtopic:
                    render_learning_content(topic, selected_subtopic, learning_mode)
                    
                    # Progress tracking
                    if st.button("Mark as Complete", key=f"complete_{topic}_{selected_subtopic}"):
                        if "completed_topics" not in st.session_state:
                            st.session_state.completed_topics = set()
                        st.session_state.completed_topics.add(f"{topic}_{selected_subtopic}")
                        st.success("Topic marked as complete! 🎉")
                        
                # Show progress
                if "completed_topics" in st.session_state:
                    completed = sum(1 for topic_sub in st.session_state.completed_topics 
                                if topic_sub.startswith(topic))
                    progress = completed / len(subtopics)
                    st.progress(progress)
                    st.write(f"Progress: {completed}/{len(subtopics)} topics completed")