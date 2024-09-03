# Movie Booking Application

## Description

Developed a full-stack movie booking application that allows users to browse movies, book tickets, and manage bookings. The application features user authentication, role-based access control, and secure payment processing using Razorpay.

## Key Features

### Frontend
- **User Dashboard:** Users can view available movies, select showtimes, and book tickets. Integrated Razorpay for secure payment processing.
- **Admin Dashboard:** Admins can create and manage movies, theatres, and shows. Implemented forms for adding new movies and scheduling shows with validation to prevent overlapping showtimes.
- **Real-time Data Fetching:** Utilized `@tanstack/react-query` for efficient data fetching and state management, ensuring real-time updates and caching.
- **Responsive Design:** Ensured a responsive and user-friendly interface using Material-UI components and custom CSS.
- **API Integration:** Integrated with backend APIs for CRUD operations on movies, theatres, and shows. Used Axios for HTTP requests.
- **Error Handling:** Implemented robust error handling and user feedback mechanisms to enhance user experience.

### Backend
- **User Authentication:** Implemented secure user authentication using JWT tokens. Users can sign up, log in, and manage their profiles.
- **Role-Based Access Control:** Integrated role-based access control to restrict access to certain routes and functionalities based on user roles (e.g., admin, user).
- **Movie Management:** Admins can add, update, and delete movies. Users can browse and view movie details.
- **Theatre and Show Management:** Admins can manage theatres, theatre halls, and show timings.
- **Booking System:** Users can book tickets for available shows. Implemented seat selection and booking validation to prevent double booking.
- **Payment Integration:** Integrated Razorpay for secure payment processing. Implemented payment verification and error handling.
- **Error Handling:** Centralized error handling using custom error classes to provide meaningful error messages to users.
- **Database Integration:** Used MongoDB for data storage. Implemented Mongoose schemas and models for data validation and interaction.
- **API Development:** Developed RESTful APIs using Express.js to handle various operations like user authentication, movie management, and booking.
- **Middleware:** Implemented custom middleware for authentication, authorization, and request validation.

## Technologies Used

### Frontend
- **Framework:** React
- **Build Tool:** Vite
- **UI Library:** Material-UI
- **HTTP Client:** Axios
- **State Management:** `@tanstack/react-query`
- **Payment Gateway:** Razorpay
- **Date Handling:** Moment.js
- **Version Control:** Git

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Payment Gateway:** Razorpay
- **Validation:** Zod
- **Dev Tools:** Nodemon, dotenv
- **Version Control:** Git, GitHub

## Project Structure

### Frontend
- **Components:** Reusable UI components.
- **Hooks:** Custom hooks for data fetching and state management.
- **Pages:** Different pages of the application.
- **Services:** API service functions.
- **Styles:** CSS and Material-UI styles.

### Backend
- **Controllers:** Handle incoming requests and interact with services.
- **Services:** Contain business logic and interact with models.
- **Models:** Define Mongoose schemas and interact with MongoDB.
- **Middlewares:** Handle authentication, authorization, and validation.
- **Routes:** Define API endpoints and route requests to appropriate controllers.
- **Utils:** Utility functions for hashing and other common tasks.

## Key Contributions
- Designed and implemented the entire backend architecture.
- Developed the user and admin interfaces using React and Material-UI.
- Integrated Razorpay for secure payment processing.
- Developed robust error handling and validation mechanisms.
- Ensured secure user authentication and role-based access control.
- Ensured application responsiveness and cross-browser compatibility.
- Define API contracts and integrate frontend with backend services.

## Repositories
- **Frontend Repository:** [https://github.com/PrakashGatiyala/movie-booking-app-fe](https://github.com/PrakashGatiyala/movie-booking-app-fe)
- **Backend Repository:** [https://github.com/PrakashGatiyala/movie-booking-app](https://github.com/PrakashGatiyala/movie-booking-app)

