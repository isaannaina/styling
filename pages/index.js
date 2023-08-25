import MeetupList from "../components/meetups/MeetupList"

function HomePage() {
  const DUMMY_MEETUPS = [
    {
      id: 'm1',
      title: 'First Meetup',
      image: 'image-url-1',
      address: '123 Main St, City',
    },
    {
      id: 'm2',
      title: 'Second Meetup',
      image: 'image-url-2',
      address: '456 Elm St, Town',
    },
    // Add more dummy meetups as needed
  ];

  return (
    <section>
      <h1>Meetup List</h1>
      <MeetupList meetups={DUMMY_MEETUPS} />
    </section>
  );
}

export default HomePage;
