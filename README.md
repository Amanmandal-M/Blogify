<h1 align="center"> Blogify: Your Full-Stack Blogging Platform </h1>

<br>

Welcome to **Blogify**, your go-to platform for creating and sharing engaging blog posts. With a focus on user-friendly design and seamless functionality, Blogify empowers you to express your thoughts and ideas effortlessly.

<br>

![Blogify Screenshot](insert_screenshot_url_here)

<br>
 
## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [License](#license)

<br>

## Features

- **User Authentication**: Securely sign up, log in, and manage your profile.
- **Create Blog Posts**: Share your stories by creating and publishing new blog posts.
- **View Posts**: Browse through a collection of engaging blog posts.
- **Edit and Delete Posts**: Edit your published posts or remove them if needed.
- **Responsive Design**: Enjoy a seamless experience on different devices.
- **User-Friendly Interface**: Navigate easily with an intuitive and clean UI.

<br>

## Technologies Used

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js, MySQL
- **Deployment**: AWS EC2, Nginx (or other reverse proxy)
- **API Communication**: Fetch API (or AJAX)

<br>

## Getting Started

1. Clone this repository: `git clone https://github.com/your-username/blogify.git`
2. Navigate to the backend directory: `cd backend`
3. Install backend dependencies: `npm install`
4. Set up your MySQL database and configure `.env` file.
5. Start the backend server: `npm start`
6. Navigate to the frontend directory: `cd ../frontend`
7. Install frontend dependencies: `npm install`
8. Start the frontend development server: `npm start`

<br>

## Usage

- Visit `http://localhost:3000` to access the Blogify frontend.
- Interact with the application to explore and create blog posts.

<br>

## API Documentation

For detailed API documentation and available endpoints, refer to [API Documentation](swaggerdocs).

<br>

## Deployment

1. Set up an AWS EC2 instance and configure it to run a Node.js application.
2. Install and configure Nginx or any other reverse proxy to route requests to the Node.js application.
3. Deploy the frontend build on the EC2 instance.
4. Connect the frontend to the backend API running on the EC2 instance.

For more detailed deployment instructions, see [Deployment Guide](deployment-guide.md).

<br>

## License

This project is licensed under the [MIT License](LICENSE).
