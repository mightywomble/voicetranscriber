
# AI Voice Transcriber - Full Setup Guide

This guide provides step-by-step instructions to set up and run the AI Voice Transcriber application.

## Table of Contents

1.  [Introduction](https://www.google.com/search?q=%23introduction "null")
    
2.  [Features](https://www.google.com/search?q=%23features "null")
    
3.  [Prerequisites](https://www.google.com/search?q=%23prerequisites "null")
    
4.  [Setup Instructions](https://www.google.com/search?q=%23setup-instructions "null")
    
    -   [Step 1: Create a Firebase Project](https://www.google.com/search?q=%23step-1-create-a-firebase-project "null")
        
    -   [Step 2: Enable Firebase Services](https://www.google.com/search?q=%23step-2-enable-firebase-services "null")
        
    -   [Step 3: Get Your Gemini API Key](https://www.google.com/search?q=%23step-3-get-your-gemini-api-key "null")
        
    -   [Step 4: Running the Application](https://www.google.com/search?q=%23step-4-running-the-application "null")
        
5.  [Troubleshooting](https://www.google.com/search?q=%23troubleshooting "null")
    

### Introduction

The AI Voice Transcriber is a web application that records your voice, transcribes it to text in real-time, and provides additional AI-powered tools to summarize and analyze the text. It saves your recordings for the current session and includes an audio visualizer for a dynamic user experience.

### Features

-   **Real-time Voice Transcription**: Converts spoken words to text instantly.
    
-   **AI-Powered Summarization**: Uses the Gemini API to summarize text and extract key bullet points.
    
-   **Audio Visualizer**: Provides visual feedback while recording.
    
-   **Session History**: Stores recordings with audio playback for your current session.
    
-   **Download & Share**: Allows you to download the transcription as a `.txt` file or share it using your device's native sharing options.
    
-   **Secure Configuration**: All settings, including API keys, are stored locally in your browser.
    

### Prerequisites

-   A **Google Account**.
    
-   A modern web browser like **Google Chrome**, **Firefox**, or **Edge**.
    
-   **Node.js and npm**: Required to run the local web server.
    

#### Installing Node.js and npm on Ubuntu 24.04

These instructions use the official NodeSource repository to install a current version of Node.js.

1.  **Update your package list**:
    
    ```
    sudo apt update
    
    ```
    
2.  **Install `curl`**, which is used to download the setup script:
    
    ```
    sudo apt install -y curl
    
    ```
    
3.  **Download and run the NodeSource setup script**. This example uses Node.js v22.x. You can change the version in the URL if needed.
    
    ```
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    
    ```
    
4.  **Install Node.js and npm**:
    
    ```
    sudo apt-get install -y nodejs
    
    ```
    
5.  **Verify the installation** by checking the versions:
    
    ```
    node -v
    npm -v
    
    ```
    

### Setup Instructions

#### Step 1: Create a Firebase Project

First, you need a Firebase project to handle user authentication and store settings.

1.  **Go to the Firebase Console**: [https://console.firebase.google.com/](https://console.firebase.google.com/ "null")
    
2.  **Add a new project**: Click on "Add project", give it a name (e.g., "AI-Voice-App"), and follow the on-screen instructions. You can disable Google Analytics for this project if you wish.
    
3.  **Create a Web App**:
    
    -   Once your project is ready, you will be on the Project Overview page.
        
    -   Click the **web icon (`</>`)** to register a new web app.
        
    -   Give your app a nickname (e.g., "Transcriber Web") and click **"Register app"**.
        
    -   Firebase will show you a `firebaseConfig` object. You don't need to copy it now; we will retrieve it later. Click **"Continue to console"**.
        

#### Step 2: Enable Firebase Services

You need to enable two core Firebase services: Authentication and Firestore.

1.  **Enable Authentication**:
    
    -   In the left-hand menu, under the "Build" section, click **Authentication**.
        
    -   Click the **"Get started"** button.
        
    -   On the next screen, click the **"Sign-in method"** tab.
        
    -   From the list of providers, select **"Anonymous"**.
        
    -   **Enable** the toggle switch and click **"Save"**. This is crucial for the app to work without requiring a user login.
        
2.  **Enable Firestore Database**:
    
    -   In the left-hand menu, under the "Build" section, click **Firestore Database**.
        
    -   Click the **"Create database"** button.
        
    -   Select **"Start in production mode"** and click **"Next"**.
        
    -   Choose a Firestore location (the default is usually fine) and click **"Enable"**.
        
3.  **Configure Firestore Security Rules**:
    
    -   After the database is created, go to the **"Rules"** tab.
        
    -   Replace the default rule with the following code. This allows authenticated users to access their own data.
        
    
    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /users/{userId}/{documents=**} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
    
    ```
    
    -   Click **"Publish"** to save the new rules.
        

#### Step 3: Get Your Gemini API Key

To use the AI summarization feature, you need an API key from Google AI Studio.

1.  **Go to Google AI Studio**: [https://aistudio.google.com/](https://aistudio.google.com/ "null")
    
2.  **Create API Key**:
    
    -   Log in with your Google account.
        
    -   Click on **"Get API key"** from the left-hand menu.
        
    -   Click **"Create API key in new project"**.
        
    -   A new key will be generated for you. **Copy this key** and save it somewhere safe temporarily.
        

#### Step 4: Running the Application

Now you have everything you need to configure and run the app.

1.  **Get Firebase Config Details**:
    
    -   Go back to your **Firebase project**.
        
    -   Click the **gear icon (`⚙️`)** in the top-left corner and select **"Project settings"**.
        
    -   In the "General" tab, scroll down to the "Your apps" section.
        
    -   You will see the `firebaseConfig` object. Keep this page open.
        
2.  **Open the App**:
    
    -   Save the application's HTML code as `index.html`.
        
    -   Open the `index.html` file in your web browser.
        
3.  **Configure the App's Settings**:
    
    -   In the app, click the **settings icon (`⚙️`)** in the top-right corner.
        
    -   The settings panel will slide out. It will be pre-filled with default values.
        
    -   Carefully copy the values from your Firebase project's `firebaseConfig` object into the corresponding fields in the app's settings panel.
        
    -   In the **"Gemini API Key"** field, paste the key you generated from Google AI Studio.
        
    -   Click **"Save Settings & Reload"**. The page will automatically reload with your new configuration.
        

### Troubleshooting

-   **"User ID: Auth Failed"**: This means you have not enabled "Anonymous" as a sign-in method in your Firebase project's Authentication settings. See Step 2.
    
-   **"Please configure and save Firebase settings first"**: This means the app could not initialize Firebase. Double-check that all the values in the settings panel exactly match your `firebaseConfig` object from the Firebase console.
    
-   **"Microphone access was denied"**: You need to grant the web page permission to use your microphone. If you accidentally clicked "Block", you may need to go into your browser's site settings to change this permission for the page.
    
-   **AI Summary Fails**: This usually means the Gemini API Key is incorrect or has not been saved properly. Re-check the key in the settings panel.