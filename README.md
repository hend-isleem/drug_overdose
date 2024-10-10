# Drug Overdose Interaction Warnings System

### Project Overview
This project is a web-based healthcare application aimed at helping healthcare providers identify potential drug interactions in real time. 

### Motivation
Adverse drug reactions caused by drug-drug interactions  are a significant cause of hospitalization and mortality. This project is designed to help healthcare providers reduce these risks by providing timely and accurate warnings about dangerous drug combinations.

### Objectives
- Provide healthcare providers with an intuitive interface to input patient medication regimens.
- Use external databases to retrieve real-time drug interaction data.
- Enable personalized warnings based on patient-specific information such as age or medical conditions.

### Technologies
- **Frontend:** Next.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB, Redis (for caching)
- **External APIs:** DrugBank, RxNorm, OpenFDA

### System Components
1. **Frontend:** Input medication details and view interaction warnings.
2. **Backend:** Node.js and Express.js for API handling.
3. **Database:** MongoDB for logging inputs and Redis for caching.
4. **API Integration:** Connect to DrugBank, RxNorm, OpenFDA for drug data.

### Expected Deliverables
- **Prototype:** Basic functionality for drug interaction warnings.

