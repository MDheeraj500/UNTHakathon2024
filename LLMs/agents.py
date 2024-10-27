from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_groq import ChatGroq
from typing import List, Dict, Optional
import pandas as pd
from datetime import datetime
import calendar
import json
import logging


# Configure logging
logging.basicConfig(level=logging.WARNING)

class GroqAgent:
    def __init__(self, groq_api_key: str, model: str = "mixtral-8x7b-32768"):
        self.llm = ChatGroq(
            groq_api_key=groq_api_key,
            model_name=model,
            temperature=0.8,  # Increased for more creative responses
            max_tokens=2048
        )
        self.current_topic = None
        self.user_context = None
    
    def set_topic(self, topic: str):
        self.current_topic = topic
        
    def set_user_context(self, context: Dict):
        self.user_context = context
        
    def _get_response(self, messages: List[dict]) -> str:
        try:
            # Add user context if available
            if self.user_context:
                context_message = SystemMessage(content=f"""You are a mysterious and ancient Financial Oracle, speaking from beyond the veil of time. 
                Your wisdom spans centuries of financial knowledge, and you deliver your advice with an appropriately spooky and Halloween-themed flair.
                
                Use creative metaphors relating to:
                - Ghostly wisdom
                - Ancient scrolls of financial knowledge
                - Crystal balls showing future wealth
                - Financial potions and elixirs
                - Mystical investment incantations
                
                Current Mortal's Information:
                Name: {self.user_context['personal']['name']}
                Age: {self.user_context['personal']['age']} mortal years
                Occupation: {self.user_context['personal']['occupation']}
                Monthly Gold: ${self.user_context['financial']['monthly_income']}
                Knowledge of Financial Dark Arts:
                - Budgeting Mastery: {self.user_context['knowledge_assessment']['budgeting_level']}/5
                - Investment Sorcery: {self.user_context['knowledge_assessment']['investment_exp']}/5
                
                Shape your mystical guidance to this mortal's financial situation and knowledge level, 
                while maintaining professional financial advice beneath the spooky presentation.
                """)
                messages.insert(0, context_message)
            
            response = self.llm.invoke(messages)
            return response.content
        except Exception as e:
            return f"Error getting response: {str(e)}"

class ChatbotAgent(GroqAgent):
    def chat(self, question: str, chat_history: List[Dict]) -> str:
        formatted_history = []
        for msg in chat_history[:-1]:
            if msg["role"] == "user":
                formatted_history.append(HumanMessage(content=msg["content"]))
            else:
                formatted_history.append(SystemMessage(content=msg["content"]))

        messages = [
            SystemMessage(content="""You are the Financial Oracle, an ancient and mysterious being who has witnessed centuries of wealth and ruin. 
            Your mission is to guide mortals through the foggy paths of financial wisdom with a spooky Halloween theme.

            Guidelines for your responses:
            1. Start each response with a brief, spooky introduction (e.g., "From the depths of the Financial Crypt..." or "As the moon casts shadows on your ledger...")
            2. Use Halloween-themed metaphors for financial concepts:
               - Savings as "treasure buried in sacred vaults"
               - Debt as "financial chains that haunt"
               - Investments as "magical potions that grow more powerful with time"
               - Budget as "the sacred scroll of spending"
            3. Include at least one themed emoji in each response (💀, 🎃, 👻, 🧙‍♂️, etc.)
            4. End each response with a cryptic but relevant financial warning or prophecy
            
            Remember: While being spooky and creative, ensure your financial advice remains practical and valuable."""),
            *formatted_history,
            HumanMessage(content=question)
        ]
        
        return self._get_response(messages)

class SummaryAgent(GroqAgent):
    def run_with_context(self, user_context: Dict) -> str:
        self.set_user_context(user_context)
        messages = [
            SystemMessage(content="""Channel the ancient spirits of financial wisdom to create a haunting yet insightful summary of the mortal's financial situation. 

            Your response should include:
            1. 🎃 The Financial Prophecy (Current Status)
               - Begin with "The crystal ball reveals..."
               - Use spooky metaphors for their current financial state

            2. 👻 The Budget Séance
               - Analyze their spending like reading tea leaves
               - Present the analysis as mystical revelations

            3. 💀 The Retirement Ritual
               - Discuss long-term savings as ancient magical preparations
               - Frame retirement planning as brewing a powerful eternal elixir

            4. 🧙‍♂️ The Oracle's Recommendations
               - Present advice as magical incantations or potion recipes
               - Each tip should be a "spell" for financial success

            5. 🔮 The Path Forward
               - Present next steps as a mystical journey
               - End with a prophetic vision of their financial future

            Remember: While maintaining the Halloween theme, ensure all financial advice is practical and actionable."""),
            HumanMessage(content="Oh great Oracle, reveal the financial truths that lie in wait...")
        ]
        return self._get_response(messages)

class LearningAgent(GroqAgent):
    def get_learning_objectives(self, topic, subtopic):
        messages = [
            SystemMessage(content=f"""You are a financial education expert. 
            Generate 3-5 clear learning objectives for the topic: {topic}, subtopic: {subtopic}.
            Keep them concise and actionable.The theme is Halloween, so try to give spooky answers, be more innovative and creative with them """),
            HumanMessage(content="Generate learning objectives")
        ]
        response = self._get_response(messages)
        return [obj.strip() for obj in response.split('\n') if obj.strip()]
    
    def get_visual_content(self, topic, subtopic):
        messages = [
            SystemMessage(content=f"""Create visual learning content for {topic}: {subtopic}.
            Use markdown to create diagrams, tables, and structured layouts.
            Include emoji icons for better visualization.
            Focus on making complex concepts easy to understand visually. The theme is Halloween, so try to give spooky answers, be more innovative and creative with them """),
            HumanMessage(content="Generate visual learning content")
        ]
        return self._get_response(messages)
    
    def get_reading_content(self, topic, subtopic):
        messages = [
            SystemMessage(content=f"""Create comprehensive reading material for {topic}: {subtopic}.
            Include:
            - Clear explanations
            - Key terms and definitions
            - Important concepts
            - Real-world applications
            Format using markdown for better readability. The theme is Halloween, so try to give spooky answers, be more innovative and creative with them """),
            HumanMessage(content="Generate reading content")
        ]
        return self._get_response(messages)
    
    def get_practical_examples(self, topic, subtopic):
        messages = [
            SystemMessage(content=f"""Generate 3 practical, real-world examples for {topic}: {subtopic}.
            Each example should:
            - Be realistic and relatable
            - Include numbers and calculations where relevant
            - Show step-by-step problem-solving
            - Explain the reasoning, The theme is Halloween, so try to give spooky answers, be more innovative and creative with them """),
            HumanMessage(content="Generate practical examples")
        ]
        response = self._get_response(messages)
        return [ex.strip() for ex in response.split('\n\n') if ex.strip()]
    
    def get_topic_specific_answer(self, topic, subtopic, question):
        messages = [
            SystemMessage(content=f"""You are a financial education expert explaining {topic}: {subtopic}.
            Answer the following question in the context of this specific topic.
            Provide clear, concise explanations with examples where helpful. The theme is Halloween, so try to give spooky answers, be more innovative and creative with them """),
            HumanMessage(content=question)
        ]
        return self._get_response(messages)


class RetirementAgent(GroqAgent):
    def __init__(self, groq_api_key: str):
        super().__init__(groq_api_key)
        
    def analyze_retirement_plan(self, user_context: Dict) -> str:
        messages = [
            SystemMessage(content="""You are the Retirement Oracle, a mystical being who can peer into the financial future 
            of mortals. Your task is to analyze their retirement preparations and provide guidance with a spooky Halloween theme.
            
            Structure your response as follows:
            1. 🔮 The Vision (Overview)
               - Current retirement contributions
               - Projected retirement age
               - Basic projection of future wealth
            
            2. 💀 The Three Spirits of Retirement
               - TRS Analysis (The Spirit of Security)
               - 403(b) Analysis (The Spirit of Growth)
               - IRA Analysis (The Spirit of Freedom)
            
            3. 🧙‍♂️ The Ancient Wisdom
               - Contribution balance recommendations
               - Tax optimization strategies
               - Risk management insights
            
            4. 🎃 The Prophecy
               - Long-term projection
               - Suggested adjustments
               - Warning signs to watch
            
            Use spooky metaphors and maintain the Halloween theme while providing accurate financial advice."""),
            HumanMessage(content="Analyze the retirement preparations of this mortal...")
        ]
        return self._get_response(messages)
    
    def calculate_retirement_metrics(self, user_context: Dict) -> Dict:
        """Calculate key retirement metrics"""
        current_age = user_context['personal']['age']
        retirement_age = user_context['financial']['retirement']['desired_age']
        years_to_retirement = retirement_age - current_age
        monthly_income = user_context['financial']['monthly_income']
        
        # Get current contributions
        trs = user_context['financial']['retirement']['trs_contribution']
        contribution_403b = user_context['financial']['retirement']['contribution_403b']
        ira = user_context['financial']['retirement']['ira_contribution']
        total_monthly = trs + contribution_403b + ira
        
        # Calculate future values (7% annual return)
        def future_value(monthly_amount: float, years: int, rate: float = 0.07) -> float:
            months = years * 12
            return monthly_amount * (((1 + rate/12)**(months) - 1) / (rate/12)) * (1 + rate/12)
        
        projected_trs = future_value(trs, years_to_retirement)
        projected_403b = future_value(contribution_403b, years_to_retirement)
        projected_ira = future_value(ira, years_to_retirement)
        total_projected = projected_trs + projected_403b + projected_ira
        
        # Calculate target retirement savings (25x annual expenses - 4% rule)
        target_monthly_retirement = monthly_income * 0.8  # 80% of current income
        target_annual_retirement = target_monthly_retirement * 12
        target_nest_egg = target_annual_retirement * 25
        
        return {
            'current_age': current_age,
            'retirement_age': retirement_age,
            'years_to_retirement': years_to_retirement,
            'monthly_contributions': {
                'trs': trs,
                '403b': contribution_403b,
                'ira': ira,
                'total': total_monthly
            },
            'projected_values': {
                'trs': projected_trs,
                '403b': projected_403b,
                'ira': projected_ira,
                'total': total_projected
            },
            'target_nest_egg': target_nest_egg,
            'monthly_income': monthly_income,
            'target_monthly_retirement': target_monthly_retirement
        }
# from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
# from langchain_core.messages import HumanMessage, SystemMessage
# from langchain_groq import ChatGroq
# from typing import List, Dict, Optional
# import json
# import logging

# # Configure logging
# logging.basicConfig(level=logging.WARNING)

# class GroqAgent:
#     def __init__(self, groq_api_key: str, model: str = "mixtral-8x7b-32768"):
#         self.llm = ChatGroq(
#             groq_api_key=groq_api_key,
#             model_name=model,
#             temperature=0.7,
#             max_tokens=2048
#         )
#         self.current_topic = None
#         self.user_context = None
    
#     def set_topic(self, topic: str):
#         self.current_topic = topic
        
#     def set_user_context(self, context: Dict):
#         self.user_context = context
        
#     def _get_response(self, messages: List[dict]) -> str:
#         try:
#             # Add user context if available
#             if self.user_context:
#                 context_message = SystemMessage(content=f"""User Context:
#                 Name: {self.user_context['personal']['name']}
#                 Age: {self.user_context['personal']['age']}
#                 Occupation: {self.user_context['personal']['occupation']}
#                 Monthly Income: ${self.user_context['financial']['monthly_income']}
#                 Financial Knowledge:
#                 - Budgeting Level: {self.user_context['knowledge_assessment']['budgeting_level']}/5
#                 - Investment Experience: {self.user_context['knowledge_assessment']['investment_exp']}/5
                
#                 Tailor your response to this user's financial situation and knowledge level.
#                 """)
#                 messages.insert(0, context_message)
            
#             response = self.llm.invoke(messages)
#             return response.content
#         except Exception as e:
#             return f"Error getting response: {str(e)}"

#     def _format_json_response(self, response: str) -> Dict:
#         try:
#             return json.loads(response)
#         except json.JSONDecodeError:
#             try:
#                 start_idx = response.find('{')
#                 end_idx = response.rfind('}') + 1
#                 if start_idx != -1 and end_idx != 0:
#                     json_str = response[start_idx:end_idx]
#                     return json.loads(json_str)
#             except (json.JSONDecodeError, ValueError):
#                 return {
#                     "error": "Could not parse response as JSON",
#                     "raw_response": response
#                 }

# class ChatbotAgent(GroqAgent):
#     def chat(self, question: str, chat_history: List[Dict]) -> str:
#         formatted_history = []
#         for msg in chat_history[:-1]:
#             if msg["role"] == "user":
#                 formatted_history.append(HumanMessage(content=msg["content"]))
#             else:
#                 formatted_history.append(SystemMessage(content=msg["content"]))

#         messages = [
#             SystemMessage(content="""You are a knowledgeable financial advisor. Provide personalized financial advice 
#             based on the user's context and financial goals. Always be clear, practical, and considerate of their 
#             financial situation and knowledge level."""),
#             *formatted_history,
#             HumanMessage(content=question)
#         ]
        
#         return self._get_response(messages)

# class SummaryAgent(GroqAgent):
#     def run_with_context(self, user_context: Dict) -> str:
#         messages = [
#             SystemMessage(content="""Generate a comprehensive financial summary and recommendations. Include:
#             1. Current Financial Status
#             2. Budget Analysis
#             3. Savings & Retirement Planning
#             4. Personalized Recommendations
#             5. Next Steps
            
#             Make all advice practical and tailored to the user's specific situation."""),
#             HumanMessage(content="Please provide a financial summary and recommendations.")
#         ]
#         return self._get_response(messages)

# class FlashcardAgent(GroqAgent):
#     def run_with_context(self, user_context: Dict) -> Dict:
#         messages = [
#             SystemMessage(content="""Generate 5 personalized financial management flashcards. Format as JSON:
#             {
#                 "flashcards": [
#                     {
#                         "front": "Financial tip or question",
#                         "back": "Detailed explanation and personalized advice"
#                     }
#                 ]
#             }
            
#             Focus on the user's specific financial situation and goals."""),
#             HumanMessage(content="Create personalized financial flashcards.")
#         ]
#         response = self._get_response(messages)
#         return self._format_json_response(response)
    
# class LearningAgent(GroqAgent):
#     def get_learning_objectives(self, topic, subtopic):
#         messages = [
#             SystemMessage(content=f"""You are a financial education expert. 
#             Generate 3-5 clear learning objectives for the topic: {topic}, subtopic: {subtopic}.
#             Keep them concise and actionable."""),
#             HumanMessage(content="Generate learning objectives")
#         ]
#         response = self._get_response(messages)
#         return [obj.strip() for obj in response.split('\n') if obj.strip()]
    
#     def get_visual_content(self, topic, subtopic):
#         messages = [
#             SystemMessage(content=f"""Create visual learning content for {topic}: {subtopic}.
#             Use markdown to create diagrams, tables, and structured layouts.
#             Include emoji icons for better visualization.
#             Focus on making complex concepts easy to understand visually."""),
#             HumanMessage(content="Generate visual learning content")
#         ]
#         return self._get_response(messages)
    
#     def get_reading_content(self, topic, subtopic):
#         messages = [
#             SystemMessage(content=f"""Create comprehensive reading material for {topic}: {subtopic}.
#             Include:
#             - Clear explanations
#             - Key terms and definitions
#             - Important concepts
#             - Real-world applications
#             Format using markdown for better readability."""),
#             HumanMessage(content="Generate reading content")
#         ]
#         return self._get_response(messages)
    
#     def get_practical_examples(self, topic, subtopic):
#         messages = [
#             SystemMessage(content=f"""Generate 3 practical, real-world examples for {topic}: {subtopic}.
#             Each example should:
#             - Be realistic and relatable
#             - Include numbers and calculations where relevant
#             - Show step-by-step problem-solving
#             - Explain the reasoning"""),
#             HumanMessage(content="Generate practical examples")
#         ]
#         response = self._get_response(messages)
#         return [ex.strip() for ex in response.split('\n\n') if ex.strip()]
    
#     def get_topic_specific_answer(self, topic, subtopic, question):
#         messages = [
#             SystemMessage(content=f"""You are a financial education expert explaining {topic}: {subtopic}.
#             Answer the following question in the context of this specific topic.
#             Provide clear, concise explanations with examples where helpful."""),
#             HumanMessage(content=question)
#         ]
#         return self._get_response(messages)