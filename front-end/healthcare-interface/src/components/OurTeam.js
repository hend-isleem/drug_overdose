import React from 'react';

// Sample data for team members with added image URLs
const teamMembers = [
  {
    name: "Peter Wadie",
    description: "Peter is APassionate Full Stack Software Engineer.",
    github: "https://github.com/Peter Wadie",
    linkedin: "https://www.linkedin.com/in/Peter Wadie",
    imageUrl: "Peter.jpg" // Placeholder URL
  },
  {
    name: "Hend Tarek Isleem",
    description: "Hend is a backend developer with apassion for API and Databases.",
    github: "https://github.com/Hend",
    linkedin: "https://www.linkedin.com/in/Hend",
    imageUrl: "Hend.jpg" // Placeholder URL
  },
  {
    name: "Sali AL-safadi",
    description: "sali is aDeveloper with EXperience in REACT and Node.js.",
    github: "https://github.com/sali",
    linkedin: "https://www.linkedin.com/in/sali",
    imageUrl: "sally.jpg" // Placeholder URL
  },
  {
    name: "Merihan Amr",
    description: "Merihan is a Developer with REACT in front end.",
    github: "https://github.com/merihan",
    linkedin: "https://www.linkedin.com/in/merihan",
    imageUrl: "https://example.com/path/to/dave-image.jpg" // Placeholder URL
  }
];

function OurTeam() {
  return (
    <div>
      <h1>Our Team</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {teamMembers.map((member, index) => (
          <div key={index} class="team-member">
            <img src={member.imageUrl} alt={`Profile of ${member.name}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h2>{member.name}</h2>
            <p>{member.description}</p>
            <a href={member.github} target="_blank" rel="noopener noreferrer">GitHub</a><br/>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurTeam;

