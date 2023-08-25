import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function MeetupFormPage() {
  async function addMeetupHandler(meetupData) {
    try {
      const response = await fetch('/api/add-meetups', {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add meetup');
      }

      console.log('Meetup added:', meetupData);
    } catch (error) {
      console.error('Error adding meetup:', error);
    }
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default MeetupFormPage;
