import React from 'react';

function Toolbar({ onScan, onReset, loading }) {
  return (
    <div className="toolbar">
      <h2>Y2K38 Analyzer Pro</h2>
      <div className="button-group">
        <button 
          className="reset-btn" 
          onClick={onReset} 
          disabled={loading}
          style={{ marginRight: '10px', backgroundColor: '#555', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Reset Editor
        </button>
        <button 
          className="scan-btn" 
          onClick={onScan} 
          disabled={loading}
        >
          {loading ? 'Scanning...' : 'Debug Y2K38'}
        </button>
      </div>
    </div>
  );
}

export default Toolbar;