import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import './PasswordStrength.css';  // Create and import a CSS file for styles

const PasswordStrength = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('Weak');
  const [strengthColor, setStrengthColor] = useState('red');
  const [feedback, setFeedback] = useState('');
  const [crackTime, setCrackTime] = useState('');
  const [requirements, setRequirements] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  // Check password strength
  const checkPasswordStrength = (password) => {
    const result = zxcvbn(password);
    setStrength(getStrengthLabel(result.score));
    setStrengthColor(getStrengthColor(result.score));
    setFeedback(result.feedback.suggestions.join(' '));
    setCrackTime(`Estimated time to crack: ${result.crack_times_display.offline_slow_hashing_1e4_per_second}`);
    setRequirements(validatePasswordRequirements(password));
  };

  const getStrengthLabel = (score) => {
    switch (score) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Moderate';
      case 3: return 'Strong';
      case 4: return 'Very Strong';
      default: return '';
    }
  };

  const getStrengthColor = (score) => {
    const colors = ['red', 'orange', 'yellow', 'lightgreen', 'green'];
    return colors[score];
  };

  const validatePasswordRequirements = (password) => {
    return {
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    checkPasswordStrength(event.target.value);
  };

  const generatePassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let generatedPassword = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters.charAt(randomIndex);
    }
    setPassword(generatedPassword);
    checkPasswordStrength(generatedPassword);
  };

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  };

  return (
    <div id="password-container">
      <h1>LockPass</h1>
      <p>LockPass helps you create strong, secure passwords.</p>
      
      <div>
        <label htmlFor="password">Enter your password:</label>
        <input 
          type="password" 
          id="password" 
          value={password}
          onChange={handlePasswordChange} 
          placeholder="Enter password" 
        />
        <p>Length: {password.length}</p>
      </div>

      <button onClick={togglePasswordVisibility}>Show/Hide Password</button>
      
      <p>Password strength: {strength}</p>
      <div style={{ backgroundColor: strengthColor, height: '8px' }}></div>
      
      <p>{feedback}</p>
      <p>{crackTime}</p>

      <ul>
        <li>One uppercase letter: {requirements.uppercase ? '✔️' : '❌'}</li>
        <li>One lowercase letter: {requirements.lowercase ? '✔️' : '❌'}</li>
        <li>One number: {requirements.number ? '✔️' : '❌'}</li>
        <li>One special character: {requirements.specialChar ? '✔️' : '❌'}</li>
      </ul>

      <button onClick={generatePassword}>Generate Strong Password</button>
    </div>
  );
};

export default PasswordStrength;
