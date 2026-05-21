import React from 'react';

const Toolbar = ({ onScan, loading }) => {
  return (
    <div className="toolbar">
      <h2>Y2K38 Analyzer Pro</h2>
      <button className="btn" onClick={onScan} disabled={loading}>
        {loading ? "Scanning AST..." : "Debug Y2K38"}
      </button>
    </div>
  );
};

export default Toolbar;