# backend/rag/query_engine.py
from langchain.chains import RetrievalQA
from langchain_community.chat_models import ChatOpenAI
from rag.rag_index import build_or_load_faiss_index

# Load FAISS index (change folder name if needed)
index = build_or_load_faiss_index("pdfs")

# Set up the retriever and QA chain
retriever = index.as_retriever(search_kwargs={"k": 5})
llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)

def query_pdf_knowledgebase(question: str) -> dict:
    response = qa_chain({"query": question})
    return {
        "answer": response["result"],
        "sources": [doc.metadata.get("source", "") for doc in response["source_documents"]]
    }
