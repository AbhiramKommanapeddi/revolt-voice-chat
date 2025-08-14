# Revolt Motors Voice Chat Replication

## Overview

This project replicates the real-time voice chat interface of the Revolt Motors website using the Gemini Live API. It allows users to interact with a conversational AI assistant that supports interruptions, quick responses, and context-specific replies about Revolt Motors.

## Features

- **Real-time voice conversation** with AI.
- **Interruptible responses:** Users can speak while AI is talking, and AI will adapt accordingly.
- **Context-aware replies** limited to Revolt Motors information.
- **Responsive chat UI** displaying both user input and AI responses.
- **Text-to-speech** functionality for AI replies.
- **Supports multiple browsers** with speech recognition capabilities.

## Demo

A 30–60 second demo video showcasing the app:  
[\[Insert Google Drive Link Here\]](https://drive.google.com/file/d/1c7GgmI23ePIoY8_SNXiQeU1X40zcQJed/view?usp=sharing)

## Technology Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Voice API:** Gemini Live API (`gemini-2.5-flash-preview-native-audio-dialog`)
- **Speech Recognition:** Web Speech API (`SpeechRecognition`)
- **Text-to-Speech:** Web Speech API (`SpeechSynthesis`)
- **HTTP Requests:** Axios

## Setup Instructions

### Prerequisites

- Node.js v18+ and npm installed
- Gemini Live API key from [AI Studio](https://aistudio.google.com/)
- Modern web browser with microphone support

### Backend Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/AbhiramKommanapeddi/revolt-voice-chat]
   cd backend
   Install dependencies:
   ```

npm install

Create a .env file with your Gemini Live API key:

GEMINI_API_KEY=your_api_key_here

Start the backend server:

npm start

Backend runs on http://localhost:5000

Frontend Setup

Navigate to the frontend folder:

cd ../frontend

Install dependencies:

npm install

Start the frontend:

npm start

Frontend runs on http://localhost:3000 (or another port if prompted)

Usage

Open the frontend in your browser.

Click Start Talking and speak into your microphone.

The conversation will appear in the chat box:

User messages aligned right

AI replies aligned left

AI responses are spoken aloud automatically.

System Instructions

The AI assistant is instructed to respond only about Revolt Motors and the associated services, products, and website functionalities.

Project Structure
revolt-voice-chat/
│
├── backend/
│ ├── index.js # Express server handling Gemini API requests
│ ├── package.json
│ └── .env # API key configuration
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── VoiceRecorder.jsx # React component for voice chat
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ └── README.md
│
└── README.md

Notes

Ensure your browser has microphone access enabled.

For production deployment, make sure API keys are kept secure and server-to-server communication is used.

The AI assistant currently uses a basic bot logic fallback if API limits are exceeded.
