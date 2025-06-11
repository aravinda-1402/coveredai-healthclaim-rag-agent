from langchain_community.chat_models import ChatOpenAI
import os
from dotenv import load_dotenv
load_dotenv()


def get_llm():
    return ChatOpenAI(
        model="gpt-3.5-turbo",
        temperature=0.2,
        openai_api_key=os.getenv("OPENAI_API_KEY")
    )
