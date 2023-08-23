// pages/aboutus.js

import Link from 'next/link';

const details = [
  { id: 1, name: 'Yash', role: 'Senior Developer' },
  { id: 2, name: 'Vaibhav', role: 'Backend Developer' },
  { id: 3, name: 'Suresh', role: 'Frontend Developer' },
];

function AboutUs() {
  return (
    <div>
      <h1>About Us</h1>
      <ul>
        {details.map(member => (
          <li key={member.id}>
            <Link href={`/aboutus/${member.id}`}>
              <span className="clickable-text">{member.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AboutUs;
