# AI Career Counselor

An AI-powered conversational chatbot that helps Pakistani students navigate tech career paths in Artificial Intelligence, Machine Learning, and Data Science.

---

## Live Demo

[ai-career-counselor.vercel.app](https://ai-career-counselor.vercel.app)

---

## Problem Statement

Students in Pakistan lack access to quality tech career mentorship. Professional counselors are expensive, generic online resources are overwhelming, and there is no personalized guidance tailored to local job market realities.

AI Career Counselor addresses this gap by providing free, intelligent, and conversational career guidance available 24/7.

---

## Features

- Conversational AI guidance powered by LLaMA 3.3 70B via Groq API
- Personalized career path roadmaps — ML Engineer, Data Scientist, AI Researcher, MLOps
- Pakistan-specific job market insights including local companies, remote work, and freelancing
- Curated learning resources and step-by-step skill roadmaps
- Resume building and interview preparation tips
- Higher studies guidance — MS, PhD, and international scholarship opportunities

---

## Tech Stack

| Layer        | Technology               |
|--------------|--------------------------|
| Frontend     | React.js + Vite          |
| AI Model     | LLaMA 3.3 70B (Groq API) |
| Deployment   | Vercel                   |
| Styling      | CSS                      |

---

## How It Works

The chatbot uses a domain-specific system prompt that constrains the LLM to act as a specialized career counselor grounded in Pakistan's tech landscape. Each user message is sent along with the full conversation history to maintain context across the session.

```
User Input
    +
System Prompt (Career Counselor Context)
    +
Conversation History
         |
         v
  Groq API — LLaMA 3.3 70B
         |
         v
  Personalized Career Guidance
```

---

## Project Structure

```
ai-career-counselor/
├── src/
│   ├── App.jsx         # Main chatbot component and API integration
│   └── index.css       # Base styles
├── .env                # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18 or above
- Groq API key — available free at [console.groq.com](https://console.groq.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/iamMoafiaaNawaz/ai-career-counselor.git
cd ai-career-counselor

# Install dependencies
npm install

# Create environment file
echo "VITE_GROQ_API_KEY=your_api_key_here" > .env

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Environment Variables

| Variable            | Description                        |
|---------------------|------------------------------------|
| `VITE_GROQ_API_KEY` | Groq API key from console.groq.com |

---

## Author

**Allah Moafi**
BS Artificial Intelligence — FAST National University of Computer and Emerging Sciences

[LinkedIn](https://linkedin.com/in/mafia-nawaz-2991a3345) | [GitHub](https://github.com/iamMoafiaaNawaz) | [Portfolio](https://my-portfolio-gamma-navy-37.vercel.app)

---

## License

MIT License
