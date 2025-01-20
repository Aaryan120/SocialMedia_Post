# User Submission and Admin Dashboard System

## Overview
A web-based application that allows users to submit their name, social media handle, and upload multiple images. Admins can view and manage these submissions through a real-time dashboard that displays user details and their uploaded images.

## Features

- To login to admin username: Raj_Aryan, password: 1212

### User Features:
- Submit name and social media handle.
- Upload multiple images (e.g., JPEG, PNG).
- Responsive and user-friendly submission form.

### Admin Features:
- View a dashboard displaying user submissions with:
  - User name.
  - Social media handle.
  - Preview of uploaded images.
- Real-time updates for new submissions.
- Sorting and filtering options for efficient management.
- Secure logout functionality.

## Technology Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Real-Time Communication**: Socket.IO

## Installation and Setup

### Prerequisites
- Node.js installed
- MongoDB instance running

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-submission-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```
     PORT=4000
     MONGO_URI=<your-mongodb-connection-string>
     ```

4. Start the application:
   - Start the backend:
     ```bash
     npm run dev
     ```
   - Start the frontend:
     ```bash
     cd client
     npm start
     ```

5. Open your browser and navigate to `http://localhost:3000`.

## Folder Structure
```
user-submission-dashboard/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page-level components
│   │   ├── services/      # API service files
│   │   └── App.js         # Main React component
├── server/                 # Backend Node.js application
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── server.js          # Entry point for the backend
└── README.md              # Project documentation
```

## API Endpoints

### User Routes
- **POST /api/v1/users/add**: Submit user details and images.

### Admin Routes
- **GET /api/v1/admin/adminDashboard**: Fetch all submissions for the dashboard.
- **POST /api/v1/admin/logout**: Admin logout.
- To login to admin username: Raj_Aryan, password: 1212

## Real-Time Updates
The system uses Socket.IO to provide real-time updates on the admin dashboard when a new submission is made.

## Contributing
Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

Happy coding!
