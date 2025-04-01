# Aadhaar OCR System

A web-based application that extracts structured data from Aadhaar card images using Optical Character Recognition (OCR).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setting Up Locally](#setting-up-locally)
   - [Server Setup](#2-server-setup)
   - [Client Setup](#3-client-setup)
3. [Accessing the Deployed Version](#accessing-the-deployed-version)
4. [Technologies Used](#technologies-used)

## Prerequisites

Before setting up the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (for JavaScript/Node.js applications)
- [npm](https://www.npmjs.com/) (for managing project dependencies)
- [Git](https://git-scm.com/) (for version control)

## Setting Up Locally

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/muhammedfarzin/aadhaar-ocr-system.git
cd aadhaar-ocr-system
```

---

### 2. Server Setup

The backend of this project is built using Express.js. Follow these steps to set it up locally:

#### 2.1. Install Dependencies

Navigate to the `server` directory and install the necessary dependencies:

```bash
cd server
npm install
```

#### 2.2. Configure Environment Variables

Create a `.env` file in the `server/` directory and populate it with the following values:

```env
# Server Config
PORT= # (Optional) Port number to run the server
```

#### 2.3. Run the Server

Start the server in development mode:

```bash
npm run dev
```

Alternatively, to run the server in production mode:

```bash
npm start
```

To stop the server, press `Ctrl + C` in your terminal.

---

### 3. Client Setup

The frontend of this project is built using React.js. Follow these steps to set it up locally:

#### 3.1. Install Dependencies

Navigate to the `client` directory and install the necessary dependencies:

```bash
cd client
npm install
```

#### 3.2. Configure Environment Variables

Create a `.env` file in the `client/` directory with the following content:

```env
VITE_API_BASE_URL=# URL of the backend server (Mandatory for API communication)
```

Replace `#` with the actual backend server URL (e.g., `http://localhost:3000` for local development).

#### 3.3. Run the Client

Start the React development server:

```bash
npm start
```

To build the frontend for production:

```bash
npm run build
```

## Accessing the Deployed Version

The application is deployed and accessible at:

- [**Live URL**](https://m2.farzin.in)

## Technologies Used

This project is built using modern web technologies:

- **Frontend**:
  - **React.js**: A JavaScript library for building user interfaces.
  - **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Backend**:
  - **Express.js**: A fast and minimalist web framework for Node.js.
  - **OCR Processing**: AI-based image processing for Aadhaar text extraction.
- **Version Control**:
  - **Git**: Used for source code management.
  - **GitHub**: Hosted repository for collaboration and tracking changes.
