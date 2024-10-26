# BusTicketApp

# BusTickets - Bus Ticket Purchase Application

## Project Description

BusTickets is a mobile application developed in Ionic using React for the frontend and Firebase for the backend. The application allows users to search, purchase, view, and cancel bus tickets. In addition, the app provides users with account management features, including the ability to view their username and email address, as well as options to edit their profile.

## Technologies Used in the Project

- **React**: A frontend library for building user interfaces.
- **Ionic**: A framework for building hybrid mobile and web applications with responsive user experiences.
- **Firebase**: A backend service that includes user authentication, Realtime Database for storing user and ticket information, and Firebase Authentication for user login and registration.
- **Axios**: A library for making HTTP requests to Firebase.

## Key Features

1. **User Registration and Login**:

   - Users can register using their email and password, after which their data is stored in Firebase Realtime Database.
   - Login provides access to all application features.

2. **Ticket Purchase**:

   - Display of available routes with information about the route, price, and date.
   - Ticket purchase is linked to the user's account and saved there.

3. **View and Manage Purchased Tickets**:

   - Display of all tickets the user has purchased.
   - The option to cancel tickets directly from the list, with an instant update of the view.

4. **Route Search**:

   - Search for available routes using a search tool, allowing users to easily find their desired route.

5. **User Account Management**:

   - View and display the username and email of the logged-in user.
   - The ability to edit user information and log out of the account.

6. **Navigation and Responsive Interface**:

   - Simple navigation through a side menu with options to view tickets, my account, and log out.
   - A responsive design adapted to all devices, from mobile phones to desktop computers.

Installation and Running the Project

### Prerequisites

- Node.js and npm (Node Package Manager) must be installed on your computer.

### Steps to Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/bustickets.git
   cd bustickets
2. **Install dependencies**:
   npm install
3. **Run the application**
   npm start
