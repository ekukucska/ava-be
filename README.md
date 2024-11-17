# ava-be

## Description

This is the backend service for the `ava-be` project, built using Node.js and Express. It handles various API endpoints for managing users, studies, subjects, patches, events, anomalies, and aggregated data. The backend connects to a MongoDB database using Mongoose and includes basic error handling and caching mechanisms.

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

### Make sure to an .env file & include the necessary env. variables:

PORT=<the_port_on_which_the_BE_runs>
DB_CONNECTION_STRING=<MongoDB_connection_URL>
DB_NAME=a<the_name_of_your_MongoDB_DB>
CORS_ORIGIN=<the_FE_URL>
JWT_SECRET=<a_string_representing_the_key_used_for_JWT_creation_and_checking>
