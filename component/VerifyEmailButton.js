
import React, { useState } from 'react';
const VerifyEmailButton = ({ user }) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [error, setError] = useState(null);
  const sendVerificationEmail = async () => {
    setIsSendingEmail(true);
    setError(null);
    try {
      console.log(user)
      if (!user || !user.idToken) {
        throw new Error('User information is missing.');
      }
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC8-Y5HlurWaS7Da45sHWmqcnHWlR465PI`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: user.idToken,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

  
      setIsSendingEmail(false);
    } catch (err) {
      setError(err.message);
      setIsSendingEmail(false);
    }
  };
 
  return (
    <div>
      <button onClick={sendVerificationEmail} disabled={isSendingEmail}>
        Verify Email
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default VerifyEmailButton