# backend/rag/pdf_loader.py
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from typing import List
import os

def load_pdfs_from_directory(directory: str) -> List[str]:
    all_docs = []
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)

    for filename in os.listdir(directory):
        if filename.endswith(".pdf"):
            path = os.path.join(directory, filename)
            loader = PyPDFLoader(path)
            pages = loader.load_and_split()
            chunks = splitter.split_documents(pages)
            all_docs.extend(chunks)

    return all_docs
