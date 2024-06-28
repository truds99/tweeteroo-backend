# tweeteroo-backend

This project is a Node.js API for a Twitter clone application using MongoDB. It provides a comprehensive set of features for user management and tweet operations, including user registration, tweet posting, fetching, editing, and deletion.

## Features

- User Registration: Create new user accounts with unique usernames and other details.
- Tweet Posting: Allow registered users to post new tweets.
- Fetch Tweets: Retrieve tweets from the database, including support for fetching individual tweets or all tweets in reverse chronological order.
- Edit Tweets: Enable users to edit their existing tweets.
- Delete Tweets: Allow users to delete their tweets.
Endpoints
POST /sign-up: Register a new user.
POST /tweets: Post a new tweet.
GET /tweets: Get all tweets.
PUT /tweets/:id: Edit a tweet by ID.
DELETE /tweets/:id: Delete a tweet by ID.

## Getting Started

Prerequisites
- Node.js
- MongoDB

## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
    <img style='margin: 5px;' src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="40" alt="Node.js logo" />
    <img style='margin: 5px;' src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" height="40" alt="Express logo" />
    <img style='margin: 5px;' src="https://img.shields.io/badge/Cors-FF6F91?style=for-the-badge&logo=cors&logoColor=white" height="40" alt="Cors logo" />
    <img style='margin: 5px;' src="https://img.shields.io/badge/HTTP_Status-5D5D5D?style=for-the-badge&logo=http-status&logoColor=white" height="40" alt="HTTP Status logo" />
    <img style='margin: 5px;' src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" height="40" alt="JavaScript logo" />

</p>

## How to run

### 1. Clone the Repository

```bash
git clone <REPOSITORY_URL>
```

### 2. Navigate to the Project Directory

```bash
cd <PROJECT_DIRECTORY_NAME>
```

### 3. Install Project Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
npm start
```
This will start the server at http://localhost:5000.
