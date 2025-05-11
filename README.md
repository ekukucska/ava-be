# ava-be

## Description

This is the backend service for the `ava` project — a capstone project developed as part of my Bachelor's degree in Computer Science at Universitatea „Tibiscus” - Timișoara.

Built using **Node.js** and **Express**, the backend provides RESTful API endpoints for managing users, studies, subjects, patches, events, anomalies, and aggregated sensor data. It connects to a **MongoDB** database via **Mongoose** and includes basic error handling and caching.

## Project Setup

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:
   Run in the terminal:
   git clone https://github.com/your-repo/ava-be.git
   cd ava-be

2. Install dependencies:
   Run in the terminal:
   npm install

### Starting the app:

Run in the terminal:
npm run dev

### Ensure `.env` File Exists

Check that the `.env` file is in the project directory. If it's missing, create it manually and add the required environment variables:

PORT=<the_port_on_which_the_BE_runs>
DB_CONNECTION_STRING=<MongoDB_connection_URL>
DB_NAME=a<the_name_of_your_MongoDB_DB>
CORS_ORIGIN=<the_FE_URL>
JWT_SECRET=<a_string_representing_the_key_used_for_JWT_creation_and_checking>
