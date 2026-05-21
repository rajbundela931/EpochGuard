# 🛡️ EpochGuard: Automated Y2K38 Vulnerability Analyzer

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![WebAssembly](https://img.shields.io/badge/WebAssembly-654FF0?style=for-the-badge&logo=WebAssembly&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini%20AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)

**EpochGuard** is a high-performance, full-stack Static Application Security Testing (SAST) tool engineered to safeguard legacy C codebases against the impending Year 2038 (Y2K38) integer overflow vulnerability. 

On January 19, 2038, standard 32-bit signed integers representing UNIX time will exceed their maximum computational capacity, causing critical systems to interpret the date as 1901. EpochGuard proactively identifies and patches these architectural flaws to prevent failures in industrial, financial, and embedded systems.

## ✨ Key Features

* **Real-Time AST Scanning:** Powered by a highly optimized WebAssembly (WASM) implementation of `web-tree-sitter`, the engine parses Abstract Syntax Trees at near-native speeds. It detects vulnerable `time_t` and `long` allocations even when deeply nested inside complex data structures or localized function scopes.
* **IDE-Grade Editor:** Integrated with the Microsoft Monaco Editor API to provide a responsive, debounced environment with real-time issue highlighting and local browser state persistence.
* **AI Remediation Pipeline:** Utilizes the Google Gemini API to generate context-aware refactoring solutions, safely upgrading vulnerable variables to 64-bit equivalents (e.g., `int64_t`).
* **High-Availability Architecture:** The backend incorporates a dynamic tier-failover routing mechanism, automatically shifting requests to backup AI models during periods of heavy API congestion or 503 server overloads.

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, Monaco Editor API, Axios
* **Backend:** Node.js, Express, `web-tree-sitter` (WebAssembly)
* **AI Integration:** Google GenAI SDK (Gemini 2.5 Flash / Flash-Lite)

## 🚀 Live Demo
* **Frontend:** [Insert your Vercel Link Here]
* **Backend:** [Insert your Render Link Here]

---

## 💻 Local Development Setup

If you wish to run this project locally, ensure you have Node.js installed and a free Google Gemini API key.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/y2k38-analyzer.git](https://github.com/YOUR_USERNAME/y2k38-analyzer.git)
cd y2k38-analyzer


2. Backend Setup
Navigate to the server directory, install dependencies, and configure your API key.

--Bash--
cd server
npm install


-Create a .env file inside the /server directory and add your Gemini API key:

--Code snippet--

GEMINI_API_KEY=your_actual_api_key_here
PORT=5000

-Start the backend server:

--Bash--
npm run dev

3. Frontend Setup
Open a new terminal window, navigate to the client directory, and install dependencies.

--Bash--

cd analyzer/client
npm install

-Start the React development server:

--Bash--
npm run dev

Navigate to http://localhost:5173 in your browser to use the tool!

📜 License
This project is open-source and available under the MIT License.
***

### Final Checklist for your GitHub Profile:
1. Make sure to replace `YOUR_USERNAME` in the clone link with your actual GitHub username.
2. Once you successfully deploy the project to Vercel and Render, update the **Live Demo** links at the top of the README. 
3. (Optional but highly recommended) Record a 15-second screen capture of the tool scanning and fixing code, convert it to a `.gif`, and drop it right below the title in the README!

Is there anything else you want to tweak or add before you make your repository public?