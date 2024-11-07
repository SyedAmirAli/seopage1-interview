# Task Manager App

A simple Task Manager application with a PHP backend and a modern JavaScript frontend for managing and tracking tasks efficiently.

---

## Installation Guide

### Prerequisites

-   **PHP**: Version 8.2 or higher
-   **Node.js**: Latest LTS version recommended
-   **npm**: Comes with Node.js

---

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/SyedAmirAli/seopage1-interview.git
```

---

### 2. Server Setup

#### Steps:

1. **Navigate to the server directory**:

    ```bash
    cd ./server
    ```

2. **Start the PHP Development Server**:

    Run the following command to start the server on `localhost:3001`:

    ```bash
    php -S localhost:3001
    ```

3. **Define the API URL**:

    After the server is running, define the `API_URL` in the `.env` file in the client directory as follows:

    ```dotenv
    API_URL=http://localhost:3001
    ```

---

### 3. Client Setup

#### Steps:

1. **Navigate to the client directory**:

    ```bash
    cd ./client
    ```

2. **Install dependencies**:

    Run the following command to install all required packages:

    ```bash
    npm install
    ```

3. **Start the Development Server**:

    Start the client development server on `localhost:3000`:

    ```bash
    npm run dev
    ```

---

### Accessing the Application

-   **API**: Accessible at [http://localhost:3001](http://localhost:3001)
-   **Frontend**: Accessible at [http://localhost:3000](http://localhost:3000)

Once both servers are running, you can view and interact with the Task Manager app in your browser.

---

### Project Structure

-   **Server**: PHP (8.2+) backend serving the API.
-   **Client**: JavaScript frontend for a responsive task management interface.

---

### Troubleshooting

-   **Port Conflicts**: If `localhost:3001` or `localhost:3000` is in use, adjust the ports as needed in the `.env` file and startup commands.
-   **Environment Variables**: Make sure the `.env` file in the client directory has the correct `API_URL` defined.

---

Happy task managing!
