import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Toolbar from './components/Toolbar';
import CodeEditor from './components/CodeEditor';
import IssuePanel from './components/IssuePanel';
import './index.css';

const DEFAULT_TEMPLATE = '// Paste your legacy C code here\n#include <stdio.h>\n#include <time.h>\n\nint main() {\n    time_t current_time;\n    long old_timestamp;\n    return 0;\n}';

// This automatically connects to your live Render server!
const BACKEND_URL = 'https://epochguard.onrender.com';

function App() {
  // CHANGED: Now uses sessionStorage so new tabs start fresh
  const [code, setCode] = useState(() => {
    return sessionStorage.getItem('y2k38_saved_code') || DEFAULT_TEMPLATE;
  });
  
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  // CHANGED: Now uses sessionStorage 
  useEffect(() => {
    sessionStorage.setItem('y2k38_saved_code', code);
  }, [code]);

  // NEW: Instantly resets the editor back to the default state
  const handleReset = () => {
    setCode(DEFAULT_TEMPLATE);
    setVulnerabilities([]);
    if (editorRef.current && window.monaco) {
      window.monaco.editor.setModelMarkers(editorRef.current.getModel(), "owner", []);
    }
  };

  const handleScan = async () => {
    if (!code.trim()) {
      setVulnerabilities([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/scan`, { code });
      setVulnerabilities(res.data.vulnerabilities);
      
      if (editorRef.current && window.monaco) {
        const model = editorRef.current.getModel();
        const markers = res.data.vulnerabilities.map(v => ({
          startLineNumber: v.line,
          startColumn: 1,
          endLineNumber: v.line,
          endColumn: model.getLineMaxColumn(v.line),
          message: `Y2K38 Vulnerability: 32-bit type '${v.type}' detected.`,
          severity: 8 
        }));
        window.monaco.editor.setModelMarkers(model, "owner", markers);
      }
      
    } catch (err) {
      console.error(err);
      alert("Failed to scan code. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleFixManually = (line, col) => {
    if (editorRef.current) {
        editorRef.current.revealLineInCenter(line);
        editorRef.current.setPosition({ lineNumber: line, column: col });
        editorRef.current.focus();
    }
  };

  const handleFixAI = async (issue) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/fix`, {
        codeSnippet: issue.codeSnippet
      });
      
      const newCode = res.data.fixedCode;
      const model = editorRef.current.getModel();
      const lineLength = model.getLineMaxColumn(issue.line);
      
      editorRef.current.executeEdits("ai-fix", [{
          range: {
              startLineNumber: issue.line,
              startColumn: 1,
              endLineNumber: issue.line,
              endColumn: lineLength
          },
          text: newCode,
          forceMoveMarkers: true
      }]);
      
      const updatedCodeValue = model.getValue();
      setCode(updatedCodeValue);
      setVulnerabilities(prev => prev.filter(v => v.id !== issue.id));
      window.monaco.editor.setModelMarkers(model, "owner", []);
      
    } catch (err) {
      console.error(err);
      alert("AI refactor failed. Check API key and backend logs.");
    }
  };

  return (
    <div className="app-container">
      <div className="editor-pane">
        {/* CHANGED: Passed the new handleReset function to the Toolbar */}
        <Toolbar onScan={handleScan} onReset={handleReset} loading={loading} />
        <CodeEditor code={code} setCode={setCode} onMount={handleEditorDidMount} />
      </div>
      <IssuePanel 
        vulnerabilities={vulnerabilities} 
        onFixManually={handleFixManually} 
        onFixAI={handleFixAI} 
      />
    </div>
  );
}

export default App;