
function MeetupDetail(props) {
  const selectedMeetup = props.meetup;

  if (!selectedMeetup) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h1>{selectedMeetup.title}</h1>
      <img src={selectedMeetup.image} alt={selectedMeetup.title} />
      <address>{selectedMeetup.address}</address>
    </section>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: 'm1' } },
      { params: { id: 'm2' } },
      { params: { id: 'm3' } }, // Add the new meetup ID 'm3'
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.id;
  
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
    {
      id: 'm3',
      title: 'Third Meetup',
      image: 'image-url-3',
      address: '789 Oak St, Village',
    },
  
  ];
  
  const selectedMeetup = DUMMY_MEETUPS.find(meetup => meetup.id === meetupId);
  
  return {
    props: {
      meetup: selectedMeetup,
    },
  };
}

export default MeetupDetail;
