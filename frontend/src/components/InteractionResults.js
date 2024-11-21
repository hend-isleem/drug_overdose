import React from "react";
import { useLocation } from "react-router-dom";

const InteractionReport = () => {  
  const location = useLocation();
  const interactions = location.state?.interactions || [];

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Drug Interaction Report</h1>
      {interactions.length === 0 ? (
        <p style={styles.noInteractions}>
          No known interactions for the selected medications. Always consult
          with a healthcare provider for more details.
        </p>
      ) : (
        interactions.map((interaction, index) => (
          <div
            key={index}
            style={{
              ...styles.classificationCard,
              borderLeftColor: getLevelColor(interaction.severity),
            }}
          >
            <h2 style={styles.severity}>{interaction.severity} Interaction</h2>
            <h3>Drugs: {interaction.drugs.split("  ").join(" | ")}</h3>
            <p style={styles.description}>{interaction.description}</p>
          </div>
        ))
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
    <div style={styles.classificationContainer}>
      <h2 style={styles.referenceHeader}>Severity Levels Reference</h2>
      {classifications.map((item, index) => (
        <div
          key={index}
          style={{
            ...styles.smallCard,
            borderLeftColor: getLevelColor(item.level),
          }}
        >
          <h4 style={styles.smallLevel}>{item.level}</h4>
          <p style={styles.smallDescription}>{item.description}</p>
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
  classificationContainer: {
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px",
    marginTop: "15%",
  },
  smallCard: {
    backgroundColor: "#fff",
    padding: "2px 2px 2px 8px",
    margin: "10px 0",
    borderLeft: "4px solid",
    borderRadius: "6px",
    boxShadow: "0 2px 3px rgba(0,0,0,0.1)",
  },
  smallLevel: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333",
  },
  smallDescription: {
    fontSize: "12px",
    color: "#555",
  },
};

export default InteractionReport;
