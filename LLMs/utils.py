import os
from dotenv import load_dotenv
from agents import ChatbotAgent, SummaryAgent, LearningAgent, RetirementAgent #FlashcardAgent,


# Load environment variables
load_dotenv()

# Get API key from environment variables
groq_api_key = os.getenv('GROQ_API_KEY')

def get_agent(agent_type):
    """Shared function to initialize agents"""
    if agent_type == "chatbot":
        return ChatbotAgent(groq_api_key)
    elif agent_type == "summary":
        return SummaryAgent(groq_api_key)
    elif agent_type == "learning":
        return LearningAgent(groq_api_key)
    elif agent_type == "retirement":
        return RetirementAgent(groq_api_key)
    

# # Load environment variables
# load_dotenv()

# # Get API key from environment variables
# groq_api_key = os.getenv('GROQ_API_KEY')

# def get_agent(agent_type):
#     """Shared function to initialize agents"""
#     if agent_type == "chatbot":
#         return ChatbotAgent(groq_api_key)
#     elif agent_type == "summary":
#         return SummaryAgent(groq_api_key)
#     # elif agent_type == "flashcard":
#     #     return FlashcardAgent(groq_api_key)
#     elif agent_type == "learning":
#         return LearningAgent(groq_api_key)
    
