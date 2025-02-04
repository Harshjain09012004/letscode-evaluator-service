# Project Setup

## Installation Guide

Follow the steps below to set up and run the application.

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)
- [Redis](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/)

### Step 1: Clone the Repository
```sh
git clone https://github.com/Harshjain09012004/letscode-evaluator-service
```

### Step 2: Install Dependencies
Using npm:
```sh
npm install
```
Using yarn:
```sh
yarn install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory and add the required environment variables:
```env
PORT
REDIS_PORT
REDIS_HOST
```

### Step 4: Run redis server in your machine
Run Command
```
sudo service redis-server restart
```

### Step 5: Run the Application
Using npm:
```sh
npm run dev
```

### Step 6: Access the Application
Open your browser and visit:
```
http://localhost:PORT
```

## Contributing
Feel free to fork and contribute via pull requests.
