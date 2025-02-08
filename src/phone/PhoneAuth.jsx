import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { app } from "../firebase/firebase";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  const auth = getAuth(app);

  useEffect(() => {
    setRecaptcha('recaptcha-container');
  }, []);

  const setRecaptcha = (containerId) => {
    window.recaptchaVerifier = new RecaptchaVerifier(containerId, {
      size: 'invisible',
      callback: (response) => {
        console.log('reCAPTCHA solved', response);
      },
    }, auth);
  };

  const handlePhoneSignIn = async () => {
    try {
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      window.confirmationResult = confirmationResult;

      alert('OTP sent to your phone');
    } catch (error) {
      console.error(error);
      alert('Error during sending OTP');
    }
  };

  const handleVerificationCode = async () => {
    try {
      const confirmationResult = window.confirmationResult;

      const result = await confirmationResult.confirm(verificationCode);

      console.log('User logged in successfully:', result.user);
    } catch (error) {
      console.error(error);
      alert('Error during verification');
    }
  };

  return (
    <div>
      <div ></div>

      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={handlePhoneSignIn}>
        Send OTP
      </button>

      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleVerificationCode}>
        Verify OTP
      </button>
    </div>
  );
};

export default PhoneAuth;
