**AutoMeet** - A Project by Team Smooth Operators (formely Glitched Debuggers)

- AutoMeet is a Chrome extension powered by AI that transcribes, summarizes, and extracts action items from meeting recordings.
- It uses OpenAI Whisper for transcription and Ollama Mistral for local AI processing.
- Summaries and key insights are also sent to Slack for easy collaboration.

**Features**

- Audio Transcription: Converts meeting recordings into text using OpenAI Whisper.
- AI Summarization: Extracts key points, action items, and important dates from transcripts.
- Slack Integration: Automatically sends summaries and action items to a designated Slack channel.
- Chrome Extension UI: Provides an easy-to-use interface for generating summaries.

**Installation**

1. Backend Setup

   Prerequisites
     - Python 3.8 (older version for compatibility with Whisper)
     - pip
     - Virtual Environment (optional but recommended)

   Steps

      - Clone this repository:

         git clone https://github.com/CodingGeekVenu/AutoMeet.git
         cd AutoMeet

      - Install dependencies:

         pip install -r requirements.txt

      - Set up environment variables in a .env file:

         - SLACK_API_TOKEN= *your_slack_token*
         - SLACK_CHANNEL_ID= *your_channel_id*

      -  Run the backend server:

         python run.py

        (The backend should now be running at http://127.0.0.1:5000/)

2. Chrome Extension Setup

     - Open Chrome and navigate to chrome://extensions/.
     - Enable Developer Mode (toggle in the top right corner).
     - Click *Load unpacked* and select the extension folder in this repository.
     - The AutoMeet extension should now be visible in your Chrome toolbar.

**How to run AutoMeet**
    
- Click on the AutoMeet Chrome extension.
- Press the Summarize Meeting button to retrieve the last processed meeting summary.
- View, copy, download, or share the summary directly from the extension.
- Summaries and action items are automatically sent to Slack.

*Technologies Used*

   - Frontend: HTML, CSS, JavaScript (Chrome Extension)
   - Backend: Python (Flask, Whisper, Ollama, Slack SDK)
   - AI Models: OpenAI Whisper (for transcription), Ollama Mistral (for NLP processing)
   - Integration: Slack API

**Contributors**

- Venumadhav S 
- Prikshit Vashisth 
- Sumeer S Naidu 
- Y Naga Sai Paraksh
- C V S S Ashlesh

**License**

This project is licensed under the MIT License.

