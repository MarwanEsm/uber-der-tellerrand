# Uber Der Tellerrand

Welcome to Uber Der Tellerrand, a web application designed to help users manage and browse events. This app allows users to sign up, log in, and view a list of upcoming events. Each event includes essential details like the date, location, and a photo. The app is built using React, Firebase for authentication, and is deployed on Netlify.

## Features

- **User Authentication:** Users can register and log in securely using Firebase authentication.
- **Event Listings:** View a list of upcoming events with details including date, location, and an image.
- **Responsive Design:** The app is fully responsive and looks great on any device.
- **Simple & Elegant UI:** The user interface is designed with simplicity in mind, using modern styles with Tailwind CSS.
- **Firebase Backend:** All user data is securely managed with Firebase.

## Tech Stack

### Frontend:

- React (with TypeScript)
- Tailwind CSS for styling

### Backend:

- Firebase Authentication
- Firebase Firestore (if needed for event data)

### Deployment:

- Netlify

## Project Structure

├── public │ └── index.html ├── src │ ├── assets # Images and assets for the application │ ├── components │ │ ├── elements # Reusable UI elements like Footer, Menu │ │ ├── forms # Login, Registration, and Reset Password Forms │ │ └── overlay # AuthContainer for managing form transitions │ ├── redux # Redux state management │ ├── screens # Main pages like Home, Events, Inventory │ ├── types # TypeScript type definitions │ ├── App.tsx # Main app component │ ├── index.tsx # Entry point for the application │ └── firebase.ts # Firebase configuration and initialization ├── .eslintrc.js # ESLint configuration ├── package.json # Project dependencies and scripts ├── tailwind.config.js # Tailwind CSS configuration └── tsconfig.json # TypeScript configuration

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js and npm (You can download them [here](https://nodejs.org/))
- Firebase project configured (with the necessary keys)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/uber-der-tellerrand.git
   cd uber-der-tellerrand
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase configuration:

   Create a `.env` file in the root directory and add your Firebase configuration like this:

   ```
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. Run the application:

   ```bash
   npm start
   ```

   Your app should now be running on [http://localhost:3000](http://localhost:3000).

## Deployment

The app is deployed on Netlify. To deploy the app:

1. Install Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

2. Build the app:

   ```bash
   npm run build
   ```

3. Deploy to Netlify:

   ```bash
   netlify deploy --prod
   ```

## Firebase Setup

This app uses Firebase for authentication and, optionally, for storing event data. Make sure your Firebase project is set up and the necessary configurations are added to the `.env` file.
