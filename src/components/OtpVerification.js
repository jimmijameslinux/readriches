import React, { useState, useRef } from 'react';

function OTPInput() {
  const [otp, setOTP] = useState(['', '', '', '', '', '']); // Array to store each digit
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOTP = [...otp];
    newOTP[index] = value.length > 1 ? value[value.length - 1] : value; // Only store the last digit entered
    setOTP(newOTP);

    // Focus on the next input box if available
    if (value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleConfirmOTP = () => {
    // Concatenate the OTP digits to form the OTP string
    const enteredOTP = otp.join('');
    console.log('Entered OTP:', enteredOTP);

    // Send the OTP data to the server
    fetch('http://localhost:3001/otpverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp: enteredOTP }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response from server:', data);
        // Handle the response from the server as needed
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle errors from fetch operation
      });
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      // If the "Enter" key is pressed on the last input box, confirm OTP
      if (index === otp.length - 1) {
        handleConfirmOTP();
      }
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          maxLength={1} // Only one digit allowed
          style={{
            width: '40px',
            height: '40px',
            textAlign: 'center',
            marginRight: '5px',
          }} // Square dimensions and center alignment
          ref={(input) => (inputRefs.current[index] = input)}
        />
      ))}
      <button onClick={handleConfirmOTP}>Confirm OTP</button>
    </div>
  );
}

export default OTPInput;
