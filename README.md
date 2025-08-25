# Spanzor App

A full stack React + Firebase app for influencer campaign applications and management.

## Setup Instructions

1. **Clone the repo**:  
   `git clone https://github.com/autostralis/spanzor-app.git`
2. **Install dependencies**:  
   `npm install`
3. **Add your Firebase config**:  
   Edit `src/firebase.js` with your Firebase project details.
4. **Run locally**:  
   `npm start`
5. **Deploy**:  
   - To Vercel: Import your GitHub repo at [vercel.com](https://vercel.com)
   - To Firebase Hosting:
     ```
     npm install -g firebase-tools
     firebase login
     firebase init
     firebase deploy
     ```
---

## Features

- Google Authentication
- Influencer “Apply” to Campaigns
- Brand: See Applications for Own Campaigns

---

For enhancements (role management, bulk uploads, notifications), refer to code comments or open an issue.
