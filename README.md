# Smart Notes

Smart Notes is a full-stack note-taking application that uses AI-powered text summarization to help users quickly understand and organize information. Users can create notes, choose a summary style, and automatically generate concise summaries using a transformer-based language model.

## Features

* Create, edit, and delete notes
* AI-generated summaries powered by BART-CNN
* Multiple summary styles:
  * Brief
  * Detailed
  * Bullet Points
* Persistent note storage using localStorage
* Responsive user interface built with Next.js
* Flask backend for AI model inference

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Flask
* Flask-CORS
* Python

### AI / NLP

* Hugging Face Transformers
* BART-CNN (`facebook/bart-large-cnn`)
* PyTorch

## How It Works

1. A user creates a note and selects a summary style.
2. The frontend sends the note content to a Flask API.
3. The Flask backend processes the request using the BART-CNN transformer model.
4. The generated summary is returned to the frontend.
5. The note and summary are stored and displayed to the user.

## Installation

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend

conda activate smartnotes

pip install -r requirements.txt

python app.py
```

The backend runs on:

```text
http://127.0.0.1:5001
```

## Future Improvements

* Document upload support
* Fine-tuning on summarization datasets
* User authentication and cloud storage
