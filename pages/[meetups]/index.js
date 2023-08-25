import MeetupList from '../../components/meetups/MeetupList';
import { connectToDatabase } from '../../utils/db';

function MeetupsPage(props) {
  return (
    <MeetupList meetups={props.meetups} />
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, 
  };
}

export default MeetupsPage;
