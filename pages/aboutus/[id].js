// pages/aboutus/[id].js

import { useRouter } from 'next/router';

const details = [
  { id: 1, name: 'Yash', role: 'Senior Developer' },
  { id: 2, name: 'Vaibhav', role: 'Backend Developer' },
  { id: 3, name: 'Suresh', role: 'Frontend Developer' },
];

function AboutUsDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Find the team member details based on the ID
  const member = details.find(member => member.id === parseInt(id));

  // Display the details or "Developer doesn't exist"
  if (!member) {
    return <div>Developer doesn't exist</div>;
  }

  return (
    <div>
      <h1>{member.name}</h1>
      <p>{member.role}</p>
    </div>
  );
}

export default AboutUsDetail;
