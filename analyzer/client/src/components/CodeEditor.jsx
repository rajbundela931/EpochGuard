import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode, onMount }) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <Editor
        height="100%"
        defaultLanguage="c"
        theme="vs-dark"
        value={code}
        onChange={(val) => setCode(val)}
        onMount={onMount}
      />
    </div>
  );
};

export default CodeEditor;