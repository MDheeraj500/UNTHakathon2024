import streamlit as st
import json
from dotenv import load_dotenv
from agents import ChatbotAgent, SummaryAgent, LearningAgent #FlashcardAgent,
import tempfile
import os
from learning_path import render_learning_path
from utils import get_agent
import pandas as pd

# Load environment variables
load_dotenv()

# Get API key from environment variables
groq_api_key = os.getenv('GROQ_API_KEY')

st.set_page_config(
    page_title="AI Financial Advisor",
    page_icon="💰",
    layout="wide",  # This makes the page wide
    initial_sidebar_state="collapsed"  # Optional: starts with sidebar collapsed
)

st.markdown("""
    <style>
        /* Dark theme with Halloween colors */
        .block-container {
            background-color: #1a1a1a;
            padding: 2rem;
        }
        
        /* Title styling */
        h1 {
            color: #ff6b00 !important;
            text-shadow: 2px 2px 4px #000000;
        }
        
        /* Subheader styling */
        h2 {
            color: #8b00ff !important;
            text-shadow: 1px 1px 2px #000000;
        }
        
        /* Chat message styling */
        .stChatMessage {
            background-color: #2d2d2d !important;
            border: 1px solid #ff6b00;
            box-shadow: 0 0 10px rgba(255, 107, 0, 0.2);
        }
        
        /* Button styling */
        .stButton button {
            background-color: #ff6b00 !important;
            color: white !important;
            border: none !important;
            box-shadow: 0 0 5px rgba(255, 107, 0, 0.5);
        }
        
        .stButton button:hover {
            background-color: #8b00ff !important;
            box-shadow: 0 0 10px rgba(139, 0, 255, 0.5);
        }
        
        /* Chat input styling */
        .stChatInputContainer {
            border: 1px solid #ff6b00 !important;
            background-color: #2d2d2d !important;
        }
        
        /* Expander styling */
        .streamlit-expanderHeader {
            background-color: #2d2d2d !important;
            color: #ff6b00 !important;
        }
        
        /* Text styling */
        p {
            color: #e0e0e0 !important;
        }
    </style>
""", unsafe_allow_html=True)


# Initialize session state
if "messages" not in st.session_state:
    st.session_state.messages = []
if "user_info" not in st.session_state:
    st.session_state.user_info = {}
if "assessment_submitted" not in st.session_state:
    st.session_state.assessment_submitted = False
if "current_page" not in st.session_state:
    st.session_state.current_page = "assessment"
if "groq_api_key" not in st.session_state:
    st.session_state.groq_api_key = groq_api_key

# Check for API key
if not st.session_state.groq_api_key:
    st.error("GROQ_API_KEY not found in environment variables. Please add it to your .env file.")
    st.stop()

# Cache agent initialization
@st.cache_resource
def get_cached_agent(agent_type):
    return get_agent(agent_type)

def initialize_agent(agent_type):
    """Initialize agent with caching"""
    return get_cached_agent(agent_type)

def initialize_hardcoded_user():
    """Initialize hard-coded user details"""
    return {
        "personal": {
            "name": "John Smith",
            "age": 28,
            "occupation": "Teacher"
        },
        "financial": {
            "monthly_income": 4500,
            "fixed_expenses": 2000,
            "variable_expenses": 1000,
            "savings_goal": 1000,
            "retirement": {
                "trs_contribution": 450,
                "contribution_403b": 300,
                "ira_contribution": 200,
                "desired_age": 65
            }
        },
        "knowledge_assessment": {
            "budgeting_level": 3,
            "savings_awareness": 3,
            "credit_management": 4,
            "investment_exp": 2,
            "financial_planning": 3
        },
        "learning_preferences": "Visual"
    }

# Initialize user info if not already set
if not st.session_state.user_info:
    st.session_state.user_info = initialize_hardcoded_user()
    st.session_state.assessment_submitted = True
    
    # Add initial profile summary to chat history
    initial_message = (
        f"💡 Profile Summary:\n\n"
        f"• Name: {st.session_state.user_info['personal']['name']}\n"
        f"• Age: {st.session_state.user_info['personal']['age']}\n"
        f"• Occupation: {st.session_state.user_info['personal']['occupation']}\n"
        f"• Monthly Income: ${st.session_state.user_info['financial']['monthly_income']:,.2f}\n"
        f"• Monthly Expenses: ${st.session_state.user_info['financial']['fixed_expenses'] + st.session_state.user_info['financial']['variable_expenses']:,.2f}\n"
        f"• Savings Goal: ${st.session_state.user_info['financial']['savings_goal']:,.2f}\n"
        f"• Retirement Contributions: ${st.session_state.user_info['financial']['retirement']['trs_contribution'] + st.session_state.user_info['financial']['retirement']['contribution_403b'] + st.session_state.user_info['financial']['retirement']['ira_contribution']:,.2f}\n"
    )
    st.session_state.messages = [{"role": "system", "content": initial_message}]

# def initialize_agent_with_data(agent_type):
#     """Initialize agent with transaction data - now with proper caching"""
#     agent = get_cached_agent(agent_type)
    
#     if "transaction_data" not in st.session_state:
#         st.session_state.transaction_data = load_transaction_data()
        
#     if st.session_state.transaction_data:
#         with st.spinner("Processing transaction data..."):
#             agent.set_transaction_data(st.session_state.transaction_data)
            
#     return agent

# Function to lazily initialize agents
# @st.cache_resource
# def get_agent(agent_type):
#     from agents import ChatbotAgent, SummaryAgent, FlashcardAgent
    
#     if agent_type == "chatbot":
#         return ChatbotAgent(groq_api_key)
#     elif agent_type == "summary":
#         return SummaryAgent(groq_api_key)
#     elif agent_type == "flashcard":
#         return FlashcardAgent(groq_api_key)
#     elif agent_type == "learning":
#         return LearningAgent(groq_api_key)

def reset_app():
    st.session_state.assessment_submitted = False
    st.session_state.messages = []
    st.session_state.user_info = {}
    st.session_state.current_page = "assessment"
    st.rerun()

def render_assessment_form():
    st.title("💰 AI Financial Advisor")
    st.header("Personal Information")
    
    # Basic Information
    col1, col2, col3 = st.columns(3)
    with col1:
        name = st.text_input("Name")
    with col2:
        age = st.number_input("Age", min_value=18, max_value=100, value=18)
    with col3:
        occupation = st.selectbox("Occupation", 
            ["Student", "Teacher"])

    # Income and Expenses
    st.header("Income and Expenses")
    col1, col2 = st.columns(2)
    with col1:
        monthly_income = st.number_input("Monthly Income ($)", min_value=0)
        fixed_expenses = st.number_input("Fixed Monthly Expenses ($)", min_value=0)
    with col2:
        variable_expenses = st.number_input("Variable Monthly Expenses ($)", min_value=0)
        savings_goal = st.number_input("Monthly Savings Goal ($)", min_value=0)

    # Retirement Planning
    st.header("Retirement Planning")
    col1, col2, col3 = st.columns(3)
    with col1:
        trs_contribution = st.number_input("TRS Monthly Contribution ($)", min_value=0)
    with col2:
        contribution_403b = st.number_input("403(b) Monthly Contribution ($)", min_value=0)
    with col3:
        ira_contribution = st.number_input("IRA Monthly Contribution ($)", min_value=0)
    
    retirement_age = st.number_input("Desired Retirement Age", min_value=50, max_value=75, value=50)

    # Financial Knowledge Self-Assessment
    st.header("Financial Knowledge Self-Assessment")
    col1, col2 = st.columns(2)
    with col1:
        budgeting_level = st.slider("Budgeting Comfort Level", 1, 5, 1, 
                                  help="1: Beginner, 5: Advanced")
        savings_awareness = st.slider("Savings and Emergency Fund Awareness", 1, 5, 1)
        credit_management = st.slider("Credit and Debt Management", 1, 5, 1)
    with col2:
        investment_exp = st.slider("Investment Experience", 1, 5, 1)
        financial_planning = st.slider("Financial Goal Planning", 1, 5, 1)

    # Learning Preferences
    st.header("Learning Preferences")
    learning_mode = st.selectbox("Preferred Learning Mode", 
        ["Visual", "Reading/Writing", "Practical Examples"])

    if st.button("Submit Assessment", type="primary"):
        if not name:  # Basic validation
            st.error("Please enter your name")
            return False
        
        user_data = {
            "personal": {
                "name": name,
                "age": age,
                "occupation": occupation
            },
            "financial": {
                "monthly_income": monthly_income,
                "fixed_expenses": fixed_expenses,
                "variable_expenses": variable_expenses,
                "savings_goal": savings_goal,
                "retirement": {
                    "trs_contribution": trs_contribution,
                    "contribution_403b": contribution_403b,
                    "ira_contribution": ira_contribution,
                    "desired_age": retirement_age
                }
            },
            "knowledge_assessment": {
                "budgeting_level": budgeting_level,
                "savings_awareness": savings_awareness,
                "credit_management": credit_management,
                "investment_exp": investment_exp,
                "financial_planning": financial_planning
            },
            "learning_preferences": learning_mode
        }
        
        # Store user data and update session state
        st.session_state.user_info = user_data
        st.session_state.assessment_submitted = True
        
        # Add initial profile summary to chat history
        initial_message = (
            f"💡 Profile Summary:\n\n"
            f"• Name: {name}\n"
            f"• Age: {age}\n"
            f"• Occupation: {occupation}\n"
            f"• Monthly Income: ${monthly_income:,.2f}\n"
            f"• Monthly Expenses: ${fixed_expenses + variable_expenses:,.2f}\n"
            f"• Savings Goal: ${savings_goal:,.2f}\n"
            f"• Retirement Contributions: ${trs_contribution + contribution_403b + ira_contribution:,.2f}\n"
        )
        st.session_state.messages = [{"role": "system", "content": initial_message}]
        
        # Change page to main interface
        st.session_state.current_page = "main"
        st.success("Assessment submitted successfully!")
        st.balloons()
        st.rerun()

def render_chat_and_summary():
    st.title("💰 AI Financial Advisor")
    
    # # Initialize agents only when needed
    # if "summary_agent" not in st.session_state:
    #     st.session_state.summary_agent = initialize_agent("summary")
    #     st.session_state.summary_agent.set_user_context(st.session_state.user_info)
    
    # if "chatbot_agent" not in st.session_state:
    #     st.session_state.chatbot_agent = initialize_agent("chatbot")
    #     st.session_state.chatbot_agent.set_user_context(st.session_state.user_info)
    #     st.session_state.chatbot_agent.set_topic("personal finance")

        
    # Create two columns
    col1, col2 = st.columns([4, 1])
        
    with col2:
        st.subheader("📊 Financial Summary")
        summary_agent = initialize_agent("summary")
        summary_agent.set_user_context(st.session_state.user_info)
        
        if "summary_generated" not in st.session_state:
            st.session_state.summary_generated = False
            
        if not st.session_state.summary_generated:
            if st.button("Generate Summary", type="primary", use_container_width=True):
                with st.spinner("Analyzing your financial situation..."):
                    try:
                        summary = summary_agent.run_with_context(st.session_state.user_info)
                        st.session_state.current_summary = summary
                        st.session_state.summary_generated = True
                        st.session_state.messages.append({
                            "role": "system",
                            "content": "🔄 Financial Summary Generated"
                        })
                        st.session_state.messages.append({
                            "role": "assistant",
                            "content": summary
                        })
                        st.rerun()
                    except Exception as e:
                        st.error(f"Error generating summary: {str(e)}")
        
        if st.session_state.summary_generated and hasattr(st.session_state, 'current_summary'):
            if st.button("Regenerate Summary", use_container_width=True):
                st.session_state.summary_generated = False
                st.rerun()
    
    with col1:
        st.subheader("💭 Financial Advisory Chat")
        
        # Initialize chatbot agent
        chatbot_agent = initialize_agent("chatbot")
        chatbot_agent.set_topic("personal finance")
        chatbot_agent.set_user_context(st.session_state.user_info)
        
        # Display chat history
        chat_container = st.container()
        with chat_container:
            for message in st.session_state.messages:
                with st.chat_message(message["role"]):
                    st.markdown(message["content"])
        
        # Suggested questions
        if st.session_state.summary_generated:
            with st.expander("💡 Suggested Questions"):
                suggestions = [
                    "Can you explain my current financial situation in simpler terms?",
                    "What are the main areas where I can improve?",
                    "How can I better allocate my monthly income?",
                    "What should be my priority financial goals?",
                    "How does my budget compare to the 50/30/20 rule?"
                ]
                for suggestion in suggestions:
                    if st.button(suggestion, key=f"suggest_{suggestion}", use_container_width=True):
                        st.session_state.messages.append({
                            "role": "user", 
                            "content": suggestion
                        })
                        try:
                            with st.spinner("Thinking..."):
                                response = chatbot_agent.chat(suggestion, st.session_state.messages)
                                st.session_state.messages.append({
                                    "role": "assistant",
                                    "content": response
                                })
                            st.rerun()
                        except Exception as e:
                            st.error(f"Error generating response: {str(e)}")
        
        # Chat input - Always visible
        if prompt := st.chat_input("Ask any financial question..."):
            st.session_state.messages.append({"role": "user", "content": prompt})
            try:
                with st.spinner("Thinking..."):
                    response = chatbot_agent.chat(prompt, st.session_state.messages)
                    st.session_state.messages.append({
                        "role": "assistant",
                        "content": response
                    })
                st.rerun()
            except Exception as e:
                st.error(f"Error generating response: {str(e)}")
        
        # Chat controls
        with st.expander("💬 Chat Controls"):
            col1, col2 = st.columns(2)
            with col1:
                if st.button("Clear Chat History", use_container_width=True):
                    # Keep the initial profile summary message
                    initial_message = st.session_state.messages[0]
                    st.session_state.messages = [initial_message]
                    st.session_state.summary_generated = False
                    st.rerun()
            with col2:
                if st.button("Export Chat", use_container_width=True):
                    chat_text = "\n\n".join([
                        f"{msg['role'].upper()}: {msg['content']}" 
                        for msg in st.session_state.messages
                    ])
                    st.download_button(
                        label="Download Chat History",
                        data=chat_text,
                        file_name="financial_advisory_chat.txt",
                        mime="text/plain",
                        use_container_width=True
                    )

def render_main_interface():
    # Get navigation selection
    st.sidebar.title("Navigation")
    pages = {
        "Chat & Summary": "chat_summary",
        "Learning Path": "learning"
    }
    selection = st.sidebar.radio("Select Feature", list(pages.keys()))

    # Show current profile in sidebar
    with st.sidebar.expander("👤 Your Profile", expanded=False):
        user_info = st.session_state.user_info
        st.write(f"Name: {user_info['personal']['name']}")
        st.write(f"Age: {user_info['personal']['age']}")
        st.write(f"Occupation: {user_info['personal']['occupation']}")
        st.write(f"Monthly Income: ${user_info['financial']['monthly_income']:,.2f}")
        if st.button("Reset Profile"):
            reset_app()

    if selection == "Chat & Summary":
        render_chat_and_summary()
    elif selection == "Learning Path":
        render_learning_path()

if __name__ == "__main__":
    # Check for API key
    if not groq_api_key:
        st.error("GROQ_API_KEY not found in environment variables. Please add it to your .env file.")
        st.stop()

    # Main application flow - skip assessment form
    render_main_interface()

# def render_main_interface():
#     st.title("💰 AI Financial Advisor")
    
#     # Sidebar navigation
#     st.sidebar.title("Navigation")
#     pages = {
#         "Financial Chat": "chat",
#         "Financial Summary": "summary",
#         "Budget Flashcards": "flashcards",
#         "Learning Path": "learning"  
#     }
    
#     selection = st.sidebar.radio("Select Feature", list(pages.keys()))
    
#     # Profile information in sidebar
#     with st.sidebar.expander("👤 Your Profile", expanded=False):
#         user_info = st.session_state.user_info
#         st.write(f"Name: {user_info['personal']['name']}")
#         st.write(f"Age: {user_info['personal']['age']}")
#         st.write(f"Occupation: {user_info['personal']['occupation']}")
#         st.write(f"Monthly Income: ${user_info['financial']['monthly_income']:,.2f}")
#         if st.button("Reset Profile"):
#             reset_app()
    
#     # Initialize agents
#     chatbot_agent = get_agent("chatbot")
#     chatbot_agent.set_topic("personal finance")
#     chatbot_agent.set_user_context(st.session_state.user_info)
    
#     # Render selected feature
#     if selection == "Financial Chat":
#         st.subheader("💭 Financial Advisory Chat")
        
#         # Display chat history
#         for message in st.session_state.messages:
#             with st.chat_message(message["role"]):
#                 st.markdown(message["content"])
        
#         # Chat input
#         if prompt := st.chat_input("Ask any financial question..."):
#             # Add user message to chat history
#             st.session_state.messages.append({"role": "user", "content": prompt})
#             with st.chat_message("user"):
#                 st.markdown(prompt)
            
#             # Generate response
#             with st.chat_message("assistant"):
#                 with st.spinner("Thinking..."):
#                     try:
#                         response = chatbot_agent.chat(prompt, st.session_state.messages)
#                         st.markdown(response)
#                         st.session_state.messages.append({
#                             "role": "assistant",
#                             "content": response
#                         })
#                     except Exception as e:
#                         st.error(f"Error generating response: {str(e)}")
        
#         # Clear chat button
#         if st.button("Clear Chat History"):
#             # Keep the initial profile summary message
#             initial_message = st.session_state.messages[0]
#             st.session_state.messages = [initial_message]
#             st.rerun()
            
#     elif selection == "Financial Summary":
#         st.subheader("📊 Financial Summary")
#         summary_agent = get_agent("summary")
#         summary_agent.set_user_context(st.session_state.user_info)
        
#         if st.button("Generate Financial Summary", type="primary"):
#             with st.spinner("Analyzing your financial situation..."):
#                 try:
#                     summary = summary_agent.run_with_context(st.session_state.user_info)
#                     st.markdown(summary)
#                     # Store summary in chat history
#                     st.session_state.messages.append({
#                         "role": "system",
#                         "content": "🔄 Generated Financial Summary:\n\n" + summary
#                     })
#                 except Exception as e:
#                     st.error(f"Error generating summary: {str(e)}")
                    
#     elif selection == "Budget Flashcards":
#         st.subheader("💳 Budget Management Flashcards")
#         flashcard_agent = get_agent("flashcard")
#         flashcard_agent.set_user_context(st.session_state.user_info)
        
#         if st.button("Generate Budget Flashcards", type="primary"):
#             with st.spinner("Creating personalized budget tips..."):
#                 try:
#                     flashcards_response = flashcard_agent.run_with_context(st.session_state.user_info)
#                     if "flashcards" in flashcards_response:
#                         # Store flashcards in chat history
#                         flashcards_text = "📚 Generated Flashcards:\n\n"
#                         for i, card in enumerate(flashcards_response['flashcards'], 1):
#                             with st.expander(f"💡 Tip {i}: {card['front']}"):
#                                 st.markdown(card['back'])
#                             flashcards_text += f"**Tip {i}:** {card['front']}\n"
#                             flashcards_text += f"*Answer:* {card['back']}\n\n"
#                         st.session_state.messages.append({
#                             "role": "system",
#                             "content": flashcards_text
#                         })
#                 except Exception as e:
#                     st.error(f"Error generating flashcards: {str(e)}")

#     elif selection == "Learning Path":
#         render_learning_path()

# # Main app flow
# if not st.session_state.assessment_submitted:
#     render_assessment_form()
# else:
#     render_main_interface()