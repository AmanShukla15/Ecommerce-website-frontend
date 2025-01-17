
```markdown
# Ecommerce Website

## Project Overview
This project is an **Ecommerce Website** consisting of a **frontend** built with **React** and **Material UI**, and a **backend** built using **Node.js**, **Express**, and **MongoDB**. The **frontend** and **backend** need to be run in the same project folder for the application to work locally.

---

## Technologies Used
- **Frontend**: React, Material UI
- **Backend**: Node.js, Express, MongoDB

---

## Project Structure

The project is divided into two main parts:
1. **Frontend**: Client application built using React.
2. **Backend**: Server-side application built using Node.js and Express.

---

## Setting Up the Project Locally

### 1. Clone the Repositories

Clone both the **frontend** and **backend** repositories into the same project folder:

```bash
git clone https://github.com/AmanShukla15/Ecommerce-website-frontend
git clone https://github.com/AmanShukla15/Ecommerce-website-backend
```

Ensure that both the `frontend` and `backend` directories are in the same parent folder.

---

---

### 2. Install Dependencies

#### **Frontend**

If you're using npm version 7 or later, you may encounter issues with peer dependencies. To avoid this, run the following command to install the dependencies:

```bash
cd frontend
npm install --legacy-peer-deps
```

This will install the frontend dependencies while ignoring potential conflicts with peer dependencies.

#### **Backend**

1. Open a new terminal window and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install the backend dependencies using npm:
   ```bash
   npm install
   ```

---

### 3. Environment Variables (.env)

#### **Frontend**

In the `frontend` directory, create a `.env` file with the following contents:

```env
REACT_APP_BASE_URL = 'http://localhost:8000/'
```

#### **Backend**

In the `backend` directory, create a `.env` file with the following contents. Make sure to replace the placeholders with your actual data:

```env
MONGO_URI = 'mongodb://localhost:27017/ecommerce'  # Local MongoDB URL

ORIGIN = 'http://localhost:3000'

EMAIL = 'your-email@example.com'
PASSWORD = 'your-email-password'

LOGIN_TOKEN_EXPIRATION = "30d"  
OTP_EXPIRATION_TIME = "120000"  
PASSWORD_RESET_TOKEN_EXPIRATION = "2m"  
COOKIE_EXPIRATION_DAYS = "30"    

SECRET_KEY = 'your-secret-key'

PRODUCTION = "false"
```

Make sure your **MongoDB** instance is running locally or replace `MONGO_URI` with a cloud MongoDB URL if using a service like **MongoDB Atlas**.

---

### 4. Run the Project Locally

#### **Frontend**

1. In the `frontend` directory, run the following command to start the React app:
   ```bash
   npm start
   ```
   The frontend will be available at: [http://localhost:3000](http://localhost:3000).

#### **Backend**

1. In the `backend` directory, run the following command to start the server:
   ```bash
   npm run dev
   ```
   The backend will run and be available at: [http://localhost:8000](http://localhost:8000).

---

### 5. Open the Application

After starting both the frontend and backend, open the application in your browser by visiting: [http://localhost:3000](http://localhost:3000).

---

## Additional Notes
- Both the **frontend** and **backend** should be running simultaneously for the application to function properly.
- Make sure you have **Node.js** and **npm** installed on your machine.
- The backend uses **MongoDB**. Make sure you have MongoDB set up and running locally, or use a cloud MongoDB instance like **MongoDB Atlas**.

