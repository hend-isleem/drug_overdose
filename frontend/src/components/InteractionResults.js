import React from "react";
import { useLocation } from "react-router-dom";

const mockInteractions = [
  {
    type: "Moderate",
    drugs: ["Aspirin", "Eplerenone"],
    description:
      "Using aspirin together with eplerenone may decrease the effects of eplerenone.",
    advice: "Monitor blood pressure and adjust dosages as necessary.",
  },
  {
    type: "Minor",
    drugs: ["Paracetamol", "Ibuprofen"],
    description:
      "No serious interactions known, but always consult with a healthcare provider.",
    advice: "Use as prescribed.",
  },
];

const InteractionReport = () => {
  const location = useLocation();
  const medications = location.state?.medications || [];

  const relevantInteractions = mockInteractions.filter((interaction) =>
    interaction.drugs.some((drug) => medications.includes(drug))
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Drug Interaction Report</h1>
      {relevantInteractions.length > 0 ? (
        relevantInteractions.map((interaction, index) => (
          <div key={index} style={styles.interactionCard}>
            <h2>{interaction.type} Interaction</h2>
            <h3>Drugs: {interaction.drugs.join(", ")}</h3>
            <p>{interaction.description}</p>
            <p>
              <strong>Advice:</strong> {interaction.advice}
            </p>
          </div>
        ))
      ) : (
        <p style={styles.noInteractions}>
          No known interactions for the selected medications. Always consult
          with a healthcare provider for more details.
        </p>
      )}
      <InteractionClassification />
    </div>
  );
};

const InteractionClassification = () => {
  const classifications = [
    {
      level: "Major",
      description:
        "Highly clinically significant. Avoid combinations; the risk of the interaction outweighs the benefit.",
    },
    {
      level: "Moderate",
      description:
        "Moderately clinically significant. Usually avoid combinations; use it only under special circumstances.",
    },
    {
      level: "Minor",
      description:
        "Minimally clinically significant. Minimize risk; assess risk and consider an alternative drug, take steps to circumvent the interaction risk and/or institute a monitoring plan.",
    },
    {
      level: "Unknown",
      description: "No interaction information available.",
    },
  ];

  return (
    <div>
      {classifications.map((item, index) => (
        <div
          key={index}
          style={{
            ...styles.classificationCard,
            borderLeftColor: getLevelColor(item.level),
          }}
        >
          <h2 style={styles.level}>{item.level}</h2>
          <p style={styles.description}>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

const getLevelColor = (level) => {
  switch (level) {
    case "Major":
      return "#ff4d4d"; // Red
    case "Moderate":
      return "#ffac33"; // Orange
    case "Minor":
      return "#33cc33"; // Green
    default:
      return "#cccccc"; // Grey
  }
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f8f8f8",
  },
  header: {
    color: "#333",
    textAlign: "center",
  },
  interactionCard: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "10px",
  },
  classificationCard: {
    backgroundColor: "#fff",
    padding: "10px",
    margin: "10px 0",
    borderLeft: "5px solid",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  level: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  description: {
    fontSize: "16px",
  },
};

export default InteractionReport;
