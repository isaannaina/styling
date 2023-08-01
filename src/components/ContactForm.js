import React, { useState,  } from 'react';
const ProfileUpdatePage = ({accessToken}) => {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(10);
console.log(accessToken)
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const API_KEY = 'AIzaSyC8-Y5HlurWaS7Da45sHWmqcnHWlR465PI';
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
  
    const body = JSON.stringify({
      idToken: accessToken,
      displayName: name,
      photoUrl: photoUrl,
    });
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    };
  
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error.message || 'Profile update failed.');
      }
      alert('YOUR Profile is Updated');

      console.log('Profile updated:', data);
      setCompletionPercentage(100);
    } catch (error) {
      // Handle the error here
      console.log('Error updating profile:', error.message);
      alert('Error updating profile: ' + error.message);
    }
  };
  
  return (
    <div className="container">
      <h1 className="mt-4">Profile Update</h1>

   
      <p>Your profile is {completionPercentage}% complete. Fill in the details to complete.</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="photoUrl" className="form-label">
            Photo URL:
          </label>
          <input
            type="text"
            id="photoUrl"
            className="form-control"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdatePage;
