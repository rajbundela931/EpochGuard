import React from 'react';

const IssuePanel = ({ vulnerabilities, onFixManually, onFixAI }) => {
  return (
    <div className="issue-pane">
      <h3>Vulnerability Report</h3>
      {vulnerabilities.length === 0 ? (
        <p style={{ color: '#aaa' }}>No 32-bit vulnerabilities detected yet. Run a scan!</p>
      ) : (
        vulnerabilities.map(issue => (
          <div key={issue.id} className="issue-card">
            <p><strong>Line {issue.line}:</strong> <code>{issue.type}</code> usage detected.</p>
            <pre style={{ background: '#000', padding: '5px', borderRadius: '4px', overflowX: 'auto' }}>
              {issue.codeSnippet}
            </pre>
            <div style={{ marginTop: '10px' }}>
              <button className="btn" onClick={() => onFixManually(issue.line, issue.column)}>
                Manual Fix
              </button>
              <button className="btn btn-ai" onClick={() => onFixAI(issue)}>
                AI Refactor
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default IssuePanel;