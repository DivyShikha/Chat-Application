# Chat-Application
Mini Chat System A simple web-based chat system built using Node.js, Express, and MongoDB. Users can create, view, edit, and delete chat messages, simulating a basic chat app. The project demonstrates key CRUD functionality, dynamic EJS rendering, and server-side routing.

## Features
- **Create**: Send new messages between users.
- **Read**: View a list of all chat messages.
- **Update**: Edit existing messages.
- **Delete**: Remove unwanted messages with confirmation prompts.

## Technologies Used
- **Node.js**: Backend server.
- **Express.js**: Web framework for routing and middleware.
- **MongoDB**: Database for storing chat data.
- **EJS (Embedded JavaScript)**: Template engine for rendering dynamic HTML.
- **CSS**: For styling the UI.

## Setup and Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/DivyShikha/Chat-Application.git
    cd Chat-Application
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the MongoDB server:
    - Ensure you have MongoDB installed and running locally on `mongodb://127.0.0.1:27017`.

4. Run the application:
    ```bash
    node index.js
    ```
    The app should be running at `http://localhost:8080`.

## .gitignore Template
The project uses a `.gitignore` file to exclude unnecessary files from being tracked.
```plaintext
node_modules
.env
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*
coverage
```

## Future Enhancements
- Real-time messaging with WebSockets.
- User authentication.
- Improved UI with frameworks like Bootstrap or Tailwind CSS.

## License
This project is licensed under the MIT License.

## Author
**DivyShikha**  
[GitHub Profile](https://github.com/DivyShikha)
