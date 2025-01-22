import React from 'react';
import './App.css'; // Default CSS
import PasswordStrength from './PasswordStrength'; // Import your component

function App() {
  return (
    <div className="App">
      <PasswordStrength /> {/* Render the PasswordStrength component */}
    </div>
  );
}

export default App;
