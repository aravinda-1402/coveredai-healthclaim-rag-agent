# backend/rag/rag_index.py
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OpenAIEmbeddings
from rag.pdf_loader import load_pdfs_from_directory
import os

INDEX_PATH = "rag/faiss_index"

def build_or_load_faiss_index(pdf_folder: str):
    if os.path.exists(os.path.join(INDEX_PATH, "index.faiss")):
        return FAISS.load_local(INDEX_PATH, OpenAIEmbeddings(), allow_dangerous_deserialization=True)

    docs = load_pdfs_from_directory(pdf_folder)
    embedding = OpenAIEmbeddings()
    db = FAISS.from_documents(docs, embedding)

    os.makedirs(INDEX_PATH, exist_ok=True)
    db.save_local(INDEX_PATH)

    return db
