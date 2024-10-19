import React from 'react';

const OurTeam = () => {
  const teamMembers = [
    {
      name: 'Peter Wadie',
      description: 'A Passionate Full Stack Software Engineer',
      github: 'https://github.com/person1',
      linkedin: 'https://linkedin.com/in/person1',
      image: '/images/peter.jpg',
    },
    {
      name: 'Hend Tarek Isleem',
      description: 'Backend Developer with a passion for APIs and Databases',
      github: 'https://github.com/person2',
      linkedin: 'https://linkedin.com/in/person2',
      image: '/images/hend.jpg',
    },
    {
      name: 'Sali Al-safadi',
      description: ' Developer with experience in React and Node.js',
      github: 'https://github.com/person3',
      linkedin: 'https://linkedin.com/in/person3',
      image: '/images/sally.jpg',
    },
    {
      name: 'Merihan Amr',
      description: 'Developer with react in the front end',
      github: 'https://github.com/person4',
      linkedin: 'https://linkedin.com/in/person4',
      image: '/images/merihan.jpg',
    },
  ];

  return (
    <div className="team-container">
      <h2>Meet Our Team</h2>
      <div className="team-members">
        {teamMembers.map((member) => (
          <div key={member.name} className="team-member">
            <img src={member.image} alt={member.name} className="team-member-image" />
            <h3>{member.name}</h3>
            <p>{member.description}</p>
            <a href={member.github} target="_blank" rel="noopener noreferrer">GitHub</a> |{' '}
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;

