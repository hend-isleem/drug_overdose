import React, { useEffect, useState }  from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 





const MedicationInputForm = () => {
  const [drugList, setDrugList] = useState([]);
  const [currentDrug, setCurrentDrug] = useState("");  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [accessToken, setAccessToken] = useState(""); 
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // User logged in?
    const user = localStorage.getItem('user');
    if (user) {
      setAccessToken(JSON.parse(user).token);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleChange = (e) => {
    setCurrentDrug(e.target.value);
  };

  const handleAddDrug = () => {
    if (currentDrug) {
      setDrugList([...drugList, currentDrug]);
      setCurrentDrug("");
    }
  };

  const handleRemoveDrug = (index) => {
    setDrugList(drugList.filter((_, i) => i !== index));
  };

  const handleCheckInteractions = async () => {
    if (!isLoggedIn) {
      alert("Please log in to check interactions.");
      return; // Nope, no API call for you if you are not logged in :)
    }

    if (drugList.length === 0) return;
    // drugs API request
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post("http://localhost:3001/v1/drugs/", 
        { "drugs": drugList },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        navigate("/interaction-results", { state: { interactions: data.interactions } }); 
      } else {
        if (response && response.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
        }
        
        setError(response.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Failed to fetch drug interactions:", error);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDrugList([]);
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Drug Interaction Checker</h2>
      <p style={descriptionStyle}>
        Check interactions with multiple drugs, vaccines, supplements, alcohol,
        food, and diseases.
      </p>
      <div style={inputContainerStyle}>
        <input
          type="text"
          placeholder="Enter a drug name"
          value={currentDrug}
          onChange={handleChange}
          style={inputStyle}
        />
        <button onClick={handleAddDrug} style={addButtonStyle}>
          Add
        </button>
      </div>
      {drugList.length > 0 && (
        <div style={listContainerStyle}>
          <h3>Unsaved interactions list</h3>
          <ul style={ulStyle}>
            {drugList.map((drug, index) => (
              <li key={index} style={liStyle}>
                {drug}
                <button
                  onClick={() => handleRemoveDrug(index)}
                  style={removeButtonStyle}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div style={buttonContainerStyle}>
        <button
          onClick={handleCheckInteractions}
          style={
            drugList.length < 2 ? disabledCheckButtonStyle : checkButtonStyle
          }
          disabled={drugList.length < 2}
        >
          Check Interactions
        </button>

        <button onClick={handleReset} style={resetButtonStyle}>
          Start over
        </button>
      </div>
      {loading && <LoadingOverlay />} 
    </div>
  );
};

const LoadingOverlay = () => (
  <div style={overlayStyle}>
    <div style={spinnerStyle}></div>
    <p style={loadingTextStyle}>Loading...</p>
  </div>
);

// Styling
const containerStyle = {
  width: "100%",
  maxWidth: "400px", // Matches signup form
  margin: "50px auto", // Centers like the signup form
  padding: "30px",
  backgroundColor: "#393e46", // Matches signup form background
  borderRadius: "10px",
  color: "#eeeeee", // Light text for readability
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Similar shadow effect
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const headingStyle = {
  fontSize: "24px",
  marginBottom: "10px",
  color: "#eeeeee", // Matches text color with other forms
};

const descriptionStyle = {
  fontSize: "16px",
  marginBottom: "20px",
  color: "#cccccc", // Slightly lighter text for description
};

const inputContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
  width: "100%",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #eeeeee", // Matches input borders to the form's aesthetic
  borderRadius: "5px",
  backgroundColor: "#222831", // Dark background for inputs
  color: "#ffffff", // Light text for readability
  boxSizing: "border-box", // Ensures consistent alignment
};

const addButtonStyle = {
  padding: "10px 15px",
  marginLeft: "10px",
  backgroundColor: "#00adb5", // Accent color matching other forms
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const listContainerStyle = {
  marginBottom: "20px",
  width: "100%", // Ensures consistent width alignment
};

const ulStyle = {
  listStyleType: "none",
  paddingLeft: "0",
};

const liStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid #444", // Darker border for consistency
};

const removeButtonStyle = {
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "4px",
  cursor: "pointer",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%", // Matches width with container
  gap: "10px",
};

const checkButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#00adb5", // Accent color
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const resetButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#5c646f", // Neutral button color
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const disabledCheckButtonStyle = {
  ...checkButtonStyle,
  backgroundColor: "#cccccc", // Disabled background color
  cursor: "not-allowed",
};
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const spinnerStyle = {
  width: "50px",
  height: "50px",
  border: "5px solid #f3f3f3",
  borderTop: "5px solid #007BFF",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const loadingTextStyle = {
  color: "#fff",
  marginTop: "10px",
  fontSize: "18px",
};

export default MedicationInputForm;
