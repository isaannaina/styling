import { useEffect, useState } from 'react';

function MeetupsPage() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    fetch('/api/new-meetup') // Replace with your API route URL
      .then(response => response.json())
      .then(data => setMeetups(data))
      .catch(error => console.error('Error fetching meetups:', error));
  }, []);

  return (
    <section>
      <h1>Meetups</h1>
      <ul>
        {meetups.map(meetup => (
          <li key={meetup._id}>{meetup.title}</li>
        ))}
      </ul>
    </section>
  );
}

export default MeetupsPage;
