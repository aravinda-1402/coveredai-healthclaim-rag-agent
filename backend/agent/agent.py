from langchain.agents import initialize_agent, AgentType
from llm.openai_llm import get_llm
from agent.tools import tool_list
import os


def handle_user_query(question, filename):
    file_path = os.path.join("uploads", filename)
    tools = tool_list(file_path)
    llm = get_llm()
    
    agent_executor = initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True
    )
    
    return agent_executor.run(question)
