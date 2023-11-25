import PyPDF2
import openai
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import aiofiles
from openai import OpenAI
import asyncio
from pathlib import Path

from openai import AsyncOpenAI

app = FastAPI()
client = AsyncOpenAI(
    api_key="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",
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/gpt3-turbo")
async def gpt3_turbo():
    try:
        chat_completion = await client.chat.completions.create(
            messages=[{"role": "user", "content": "Say this is a test"}],
            model="gpt-3.5-turbo",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in GPT-3.5 Turbo request: {str(e)}")


def extract_text_from_pdf(pdf_file_path):
    text = ""
    with open(pdf_file_path, "rb") as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text


def split_text_into_chunks(text, chunk_size=4000):
    words = text.split()
    chunks = []
    current_chunk = ""
    for word in words:
        if len(current_chunk) + len(word) < chunk_size:
            current_chunk += word + " "
        else:
            chunks.append(current_chunk)
            current_chunk = word + " "
    if current_chunk:
        chunks.append(current_chunk)
    return chunks


async def process_text_async(text):
    try:
        chat_completion = await client.chat.completions.create(
            messages=[{"role": "user", "content": text}],
            model="gpt-3.5-turbo",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in GPT-3 request: {str(e)}")


async def process_text_chunks(chunks):
    processed_chunks = []
    total_chunks = len(chunks)
    for i, chunk in enumerate(chunks):
        processed_chunk = await process_text_async(chunk)
        processed_chunks.append(processed_chunk)
        progress_percentage = (i + 1) / total_chunks * 100
        print(f"Zpracováno {progress_percentage:.2f}%")
    return "".join(processed_chunks)


@app.post("/process-pdf")
async def process_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are accepted.")

    # Temporary directory for storing files
    temp_dir = "./temp"
    os.makedirs(temp_dir, exist_ok=True)

    file_location = os.path.join(temp_dir, file.filename)

    # Save PDF file
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    # Extract text from PDF
    text = extract_text_from_pdf(file_location)
    text_chunks = split_text_into_chunks(text)

    # Process text chunks
    processed_text = await process_text_chunks(text_chunks)

    # Clean up temporary files
    os.remove(file_location)

    return {"processed_text": processed_text}


def get_unique_filename(folder_path, filename):
    base_name, extension = os.path.splitext(filename)
    counter = 1
    unique_filename = filename

    while os.path.exists(os.path.join(folder_path, unique_filename)):
        unique_filename = f"{base_name}_{counter}{extension}"
        counter += 1

    return unique_filename


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    # Check for valid file format
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are accepted.")

    folder_path = "./pdf"
    os.makedirs(folder_path, exist_ok=True)

    unique_filename = get_unique_filename(folder_path, file.filename)
    file_location = os.path.join(folder_path, unique_filename)

    try:
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {str(e)}")

    return JSONResponse(status_code=200,
                        content={"message": "File uploaded successfully with filename: " + unique_filename})


@app.get("/pdf")
async def pdf_to_text():
    text = ""
    pdf_path = "./pdf/RFPDOC_43752.pdf"
    with open(pdf_path, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        num_pages = len(pdf_reader.pages)

        for page_number in range(num_pages):
            page = pdf_reader.pages[page_number]
            text += page.extract_text()

    return text


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}