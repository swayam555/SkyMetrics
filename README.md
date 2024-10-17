# SkyMetrics: Real-Time Weather Monitoring System

SkyMetrics is a real-time weather monitoring system that fetches weather data from the OpenWeatherMap API, processes it, and stores it in MongoDB. The application also provides real-time updates via WebSockets and uses Kafka for alerting when specific weather conditions are met (e.g., high temperatures). The system is built to be scalable and efficient, with Docker support for easy deployment.




![WhatsApp Image 2024-10-17 at 22 03 45_82e61d2a](https://github.com/user-attachments/assets/985a975b-e171-4366-924c-a97cc0a5c805)









# Project Overview
## Key Features:
- **Real-time Weather Data**: Fetches real-time weather data for major cities using the OpenWeatherMap API.
- **Data Storage**: Stores the processed weather data in MongoDB.
- **Real-time Alerts**: Sends alerts using Kafka when specific weather conditions are met.
- **WebSocket Integration**: Provides real-time weather updates to clients via WebSockets.
- **Scalable Architecture**: Uses Nginx as a reverse proxy and Kafka for handling high-throughput data efficiently.


## Tech Stack

# Backend:

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: A web framework for building APIs and handling HTTP requests.
- **Kafka**: A distributed event-streaming platform for real-time processing and alerts.
- **WebSockets**: For real-time communication between the server and clients.




# Database:

- **MongoDB**: NoSQL database for storing weather data.


# Frontend:
- **HTML/CSS/JavaScript**: Basic frontend for interacting with the API and displaying real-time updates.


# Containerization:

- **Docker**: Containerization tool for packaging the application and its dependencies.
- **Docker Compose**: Tool for managing multi-container Docker applications (MongoDB, Kafka, Node.js).


### Dependencies to Download

#### Backend Dependencies
- **express**: Web framework for building APIs.
- **axios**: HTTP client for making requests to the OpenWeatherMap API.
- **mongoose**: ODM for MongoDB.
- **dotenv**: Loads environment variables from a .env file.
- **kafkajs**: Kafka client library.
- **ws**: WebSocket library.

#### Development Dependencies
- **jest**: JavaScript testing framework.
- **nodemon**: Automatically restarts the server during development.
- **supertest**: Testing HTTP requests.

### Installing Dependencies
Run the following command in the project root to install all dependencies:
```bash
npm install
```







# Project Structure
The project structure follows a clear separation of concerns, with directories for different components (config, controllers, models, services, routes, etc.).


```bash
SkyMetrics/
├── src/
│   ├── config/
│   │   └── db.js                     # MongoDB connection setup
│   ├── controllers/
│   │   ├── weatherController.js       # Handles API requests for weather
│   │   └── alertController.js         # Manages alert notifications
│   ├── models/
│   │   └── weatherModel.js            # Mongoose schema for weather data
│   ├── services/
│   │   ├── weatherService.js          # Logic for data fetching and processing
│   │   └── kafkaService.js            # Kafka producer/consumer logic
│   ├── routes/
│   │   ├── weatherRoutes.js           # API routes for weather monitoring
│   │   └── alertRoutes.js             # API routes for alert management
│   ├── websockets/
│   │   └── wsServer.js                # WebSocket server for real-time updates
│   └── server.js                      # Main Express app entry point
├── public/
│   ├── css/
│   │   └── styles.css                 # Custom styles for the frontend
│   ├── js/
│   │   └── script.js                  # Frontend logic for API interaction
│   └── index.html                     # UI: Main HTML file for the app
├── nginx/
│   ├── default.conf                   # Nginx reverse proxy configuration
├── kafka/
│   ├── consumer/
│   │   └── weatherConsumer.js         # Kafka consumer for weather data
│   ├── producer/
│   │   └── weatherProducer.js         # Kafka producer for alerting
├── tests/
│   ├── weather.test.js                # Unit tests for weather logic
│   ├── alert.test.js                  # Unit tests for alert functionality
│   └── kafka.test.js                  # Unit tests for Kafka integration
├── .env                               # Environment variables (API key, MongoDB URI)
├── .gitignore                         # Ignoring node_modules, .env, etc.
├── Dockerfile                         # Docker setup for the application
├── docker-compose.yml                 # Docker Compose file for running services
├── package.json                       # Project dependencies and scripts
└── README.md                          # Documentation (setup instructions, usage, etc.)
```


# How to Run the Project

### 1. Prerequisites

- **Node.js (>= 14.x)**
- **Docker and Docker Compose**
- **Git**
- **OpenWeatherMap API Key**: You'll need an API key from OpenWeatherMap to fetch weather data. You can get one by signing up at OpenWeatherMap.




### 2. Clone the Repository

```json
git clone https://github.com/<your-username>/SkyMetrics.git
cd SkyMetrics

```


### 3. Set Up the .env File
Create a .env file in the root directory with the following content:
```bash
MONGO_URI=mongodb://mongo:27017/skymetrics
OPENWEATHER_API_KEY=your_openweather_api_key_here
PORT=3000
```

Replace your_openweather_api_key_here with your actual OpenWeatherMap API key.

### Build and Run the Application Using Docker Compose

```bash
docker-compose up --build
```
This will:

- **Build the Docker containers** for Node.js, MongoDB, Kafka, and Zookeeper.
- **Set up the necessary environment** for SkyMetrics to run.

### 5. Access the Application
- **The backend API will be available at:**
```bash
http://localhost:3000
```
- **To test WebSocket real-time updates, you can connect to:**
```bash
ws://localhost:3000

```





## Testing the Project
### 1. Trigger Weather Data Fetch

- **To manually trigger fetching of weather data for configured cities, send a request to:**

```bash
curl http://localhost:3000/api/weather/fetch

```

- **This will fetch weather data from the OpenWeatherMap API and store it in MongoDB.**

### 2. Check MongoDB for Stored Weather Data

- **To verify that weather data is being stored, you can access the MongoDB container and run queries:**

```bash
docker exec -it skymetrics-mongo-1 mongo
```





- **Once inside the MongoDB shell, run:**
```bash
use skymetrics
db.weathers.find().pretty()

```





### 3. Run Unit Tests

- **SkyMetrics comes with unit tests for various components. To run the tests, use the following command:**

```bash
npm test

```


- **This will run the tests using Jest, and you'll be able to see the test results in the terminal.**

### 4. WebSocket Real-Time Updates


- **You can use a WebSocket client (e.g., WebSocket Client Chrome extension or websocat) to connect to the WebSocket server and receive real-time updates.**
- **Connect to:**
```bash
ws://localhost:3000

```





- **Once connected, you should receive a welcome message and any updates broadcasted by the server.**



## Additional Features (Bonus)


- **Real-time Alerts**: Set up to trigger alerts when weather conditions exceed a threshold (e.g., temperature > 35°C). These alerts are handled via Kafka and can be consumed by any Kafka consumer.
- **WebSocket Communication**: Clients can receive real-time weather updates as they are fetched from the API.
- **Scalable Design**: The architecture is designed to be scalable using Nginx for load balancing and Kafka for handling high-throughput data.



















## Design Choices

### Technology Stack
- **Node.js and Express**: Chosen for their non-blocking architecture, allowing for high concurrency. Familiarity with JavaScript enabled rapid development.
- **MongoDB**: Selected for its flexibility with unstructured data and ease of scaling. The JSON-like document model fits well with the data being processed.

### Architecture
- **Microservices Architecture**: The application was designed using a microservices approach to allow individual components (like weather fetching, alerting, and WebSocket communication) to be developed and scaled independently.

### Database Design
- **MongoDB Schema**: The schema was designed to store weather data efficiently, with fields for temperature, conditions, and timestamps. This allows for easy querying and aggregation of daily summaries.

### Scalability
- **Kafka for Messaging**: Kafka was implemented to manage real-time alerts efficiently, enabling the application to handle high-throughput data without performance bottlenecks.

### User Interface
- **HTML/CSS/JavaScript**: A lightweight approach was taken for the frontend to keep the application simple and maintainable, avoiding the complexity of frontend frameworks.

### Deployment
- **Docker**: The application was containerized to ensure consistent deployment across environments. This allows for easier scaling and management of dependencies.

### Testing Strategy
- **Jest for Testing**: Chosen for its simplicity and ease of integration with Node.js, ensuring robust unit testing for all service components.






### Kafka Integration

**Purpose**: 
Kafka is used for managing real-time alerts related to weather conditions, allowing for a scalable and efficient alerting system.

**Design Choices**:
- **Decoupled Services**: Using Kafka allows the weather monitoring and alerting systems to operate independently, facilitating easier updates and maintenance.
- **Scalability**: The Kafka architecture enables the addition of more brokers to handle increased data loads, ensuring performance remains optimal as the application grows.
- **Fault Tolerance**: Kafka ensures that alerts are reliably processed, even in case of system failures. This is crucial for alerting mechanisms that might need to notify users in real-time about significant weather changes.

**Implementation**: 
Kafka producers are responsible for sending alert messages based on weather data processed, while consumers handle these alerts to notify users or trigger other actions.

---

### Nginx Integration

**Purpose**: 
Nginx is implemented as a reverse proxy and load balancer to manage incoming traffic to the SkyMetrics application.

**Design Choices**:
- **Improved Performance**: Nginx caches responses and serves static content directly, reducing the load on the Node.js server and improving overall response times.
- **Security**: Nginx adds an extra layer of security by handling incoming requests and mitigating potential attacks. It can enforce HTTPS and filter requests to protect the backend services.
- **Scalability**: As traffic increases, Nginx can distribute incoming requests across multiple instances of the Node.js application, ensuring responsiveness and efficient load handling.

**Implementation**: 
The Nginx configuration is defined in `nginx/default.conf`, specifying how to route incoming requests to the appropriate backend service. This setup allows for easy scaling and configuration adjustments in the future.














## Conclusion
Thank you for exploring the SkyMetrics project! This application showcases my ability to integrate various technologies for real-time weather monitoring. I welcome any feedback or questions regarding the implementation and design choices.
