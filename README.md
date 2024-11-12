# Asset Hub

Visit the live site [Asset Hub](https://asset-management-c4990.web.app/)

## Project Overview
- **Concept**: Any company can use this web app by
purchasing a subscription. The main goal of this software is to make it easy for HR
Managers to track how employees are using company assets.

## Features
- CRUD operations are implemented using Node.js with Express.js. Implemented pagination
bottom of all the tables through backend to prevent loading all data at once. It helps in
reducing the load on the server and the client, improving performance and user experience.
- A secure payment system (Stripe API) is included so that the HR user can make the payment
after purchasing the package to start the process. It will be stored with all the information in
the database through the backend.
Used TanStack Query to simplifies data fetching with declarative APIs, reducing boilerplate
code. It automatically caches server responses to enhance performance and updates stale
data in the background for real-time synchronization. With support for optimistic updates, it
ensures a smooth user experience by updating the UI immediately.

## Technology Used
**React.js**, **Tailwind**, **MongoDB**, **Node.js**, **Express.js**, **Tanstack Query**, **JWT**, **Firebase**

## How to Clone and Run Locally

### Frontend
1. **Clone the repository**:
   ```sh
   git clone https://github.com/developer-fahad/asset-management-client.git

2. **Open with Vs code from directory**:
   ```sh
   cd /your-cloned-project-directory

3. **Install dependencies**:
   ```sh
   npm install

4. **Set up environment variables**:
   - Create a .env file in the frontend directory. 
   - Add necessary Firebase config keys.

5. **Start the development server**:
   ```sh
   npm run dev


### Backend
1. **Clone the repository**:
   ```sh
   git clone https://github.com/developer-fahad/asset-management-server.git

1. **Navigate to backend directory**:
   ```sh
   cd /your-cloned-project-directory

3. **Install dependencies**:
   ```sh
   npm install

4. **Set up environment variables**:  
   - Create a .env file in the  backend directory..  
   - Add MongoDB credentials and any other necessary configurations.

5. **Run the backend server**:
   ```sh
   npm start


6. **Access the frontend website**:
   - Open your browser and go to https://assetmanage-server.onrender.com.
