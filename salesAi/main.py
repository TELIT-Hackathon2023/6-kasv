import PyPDF2
from aiohttp.web_fileresponse import FileResponse
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
from dotenv import load_dotenv
import os
from openai import AsyncOpenAI
import gensim
from gensim.models.doc2vec import TaggedDocument
import webbrowser

load_dotenv()
app = FastAPI()
api_key = os.getenv("OPENAI_API_KEY")
client = AsyncOpenAI(api_key=api_key)

origins = [
    "http://localhost:3000",  # React app's origin
]

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
            text += page.extract_text() + "\n\n"
    return text


def split_text_into_chunks(text, chunk_size=4000):
    words = text.split()
    chunks = []
    current_chunk = ""
    for word in words:
        if len(current_chunk) + len(word) + 1 < chunk_size:
            current_chunk += word + " "
        else:
            chunks.append(current_chunk.strip())
            current_chunk = word + " "
    if current_chunk:
        chunks.append(current_chunk.strip())
    return chunks


async def process_text_chunk(chunk, index, last_index):
    summary_prompt = f"Summarize the following text:\n\n{chunk}"

    try:
        chat_completion = await client.chat.completions.create(
            messages=[{"role": "user", "content": summary_prompt}],
            model="gpt-3.5-turbo",
            stop=["\n\n"]
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in GPT-3.5 Turbo request: {str(e)}")


@app.post("/process-pdf")
async def process_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are accepted.")

    temp_dir = "./temp"
    os.makedirs(temp_dir, exist_ok=True)
    file_location = os.path.join(temp_dir, file.filename)

    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    text = extract_text_from_pdf(file_location)
    chunks = split_text_into_chunks(text)

    response = ""

    for index, chunk in enumerate(chunks):
        summary_chunk = await process_text_chunk(chunk, index, len(chunks) - 1)
        response += summary_chunk + "\n\n"

    return response


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


@app.post("/new-pdf")
async def compare_pdfs(file: UploadFile = File(...)):
    os.makedirs('pdf', exist_ok=True)
    file_path = os.path.join('pdf', file.filename)
    file_path = generate_unique_file_path(file_path)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    try:
        similarity = compare_pdf_files(file_path, './pdf/dtits/scraped_data.pdf')
        similarity = (round(float(similarity), 2) * 10) if similarity is not None else None
        return {"filename": file.filename, "similarity": similarity}
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}


def generate_unique_file_path(path):
    directory, filename = os.path.split(path)
    base_filename, extension = os.path.splitext(filename)

    counter = 1
    while os.path.exists(path):
        new_filename = f"{base_filename}_{counter}{extension}"
        path = os.path.join(directory, new_filename)
        counter += 1
    return path


def compare_pdf_files(file_path1, file_path2):
    pdf1 = PyPDF2.PdfReader(file_path1)
    pdf2 = PyPDF2.PdfReader(file_path2)

    documents = []
    for pdf in [pdf1, pdf2]:
        text = ''
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
        documents.append(TaggedDocument(gensim.utils.simple_preprocess(text), [pdf]))

    model = gensim.models.Doc2Vec(documents, vector_size=50, min_count=2, epochs=40)
    similarity = model.dv.similarity(0, 1)
    return similarity


@app.get("/pdfs")
async def get_pdfs():
    pdfs = []
    for filename in os.listdir('./pdf'):
        if filename.endswith('.pdf'):
            print(filename)
            similarity = compare_pdf_files('./pdf/dtits/scraped_data.pdf', f'./pdf/{filename}')
            similarity = (round(float(similarity), 2)*10) if similarity is not None else None
        pdfs.append({'filename': filename, 'similarity': similarity})
    return pdfs


@app.get("/pdfs/{filename}")
async def get_pdf(filename: str):
    path = os.path.join('./pdf', filename)
    webbrowser.open_new(path)