# Country RBAC System

Welcome to the Country RBAC System documentation. This project implements multi-country support and role-based access control (RBAC) to provide secure, country-specific data management functionality.

## Overview

The Country RBAC System allows users to select a country, persist their selection across sessions, and perform data operations based on their roles (Admin or Viewer). It ensures robust access control while tagging data with the user’s selected country.

## Core Functionalities

### 🌍 Multi-Country Support

- **Country Selection**: Users can select a country from a dropdown.
- **Persistence**: The selected country persists across sessions.
- **Data Tagging**: All created data is automatically tagged with the user's selected country.

### 🔒 Role-Based Access Control (RBAC)

- **Admin Role**: Full CRUD (Create, Read, Update, Delete) access to data for any country.
- **Viewer Role**: Read-only access to data for their assigned country.
- **Access Restrictions**: Role and country determine user access permissions.

### 🗃 Data Management

- **CRUD Operations**: Data is managed based on the user's role and country.
- **Backend Validation**: Enforces country tagging and access restrictions server-side.

### 📋 User Profile Management

- **Country Field**: User profiles include a field to store the selected country.
- **Role Assignment**: Admins manage roles and countries for other users.

## API Endpoints

### Auth Routes (`/api/auth`)
- **POST /login**: User login.
- **POST /admin**: Admin login.
- **POST /register**: User registration.
- **GET /verify**: Verify authenticated user (requires token).

### User Routes (`/api/user`)
- **GET /profiles**: Get all user profiles (Admin only).
- **PUT /update/:id**: Update user profile.
- **POST /request-admin**: Send a request for admin role.

### Data Routes (`/api`)
- **POST /create**: Create new data entry (Admin only).
- **GET /data**: Get data for a specific country.
- **GET /all-data**: Get data for all countries.
- **PUT /update/:id**: Update data (Admin only).
- **DELETE /delete/:id**: Delete data (Admin only).

## Technical Details

### Frontend

- **Country Dropdown**: Enables users to select and update their country.
- **CRUD UI**: Forms and tables for creating, viewing, editing, and deleting data.
- **Role-Specific Views**: UI adapts to the user's role and country selection.

### Backend

- **Authentication Middleware**: Validates user tokens and permissions.
- **Controller Structure**: Dedicated controllers for handling business logic.
- **Database Schema**: MongoDB with fields for country and role in the user profile.

### Authentication & Authorization

- **User Roles**: Admin and Viewer roles implemented.
- **Access Enforcement**: Permissions validated based on user profiles.

## Getting Started

To set up the TaskTrackify application locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/Ankitverma1229/country-rbac-system
```

2. Install dependencies:

```
npm install
```

3. Start the backend application:

```
npm run dev
```

4. Start the frontend application

```
npm run dev
```

## Technology Stack

- **Frontend Framework**: React.js
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Future Enhancements

- Advanced role management for Admins to assign and modify roles.
- Enhanced error handling and validation.
- Analytics for data access and role-based activity.


## Contact

For inquiries and support, please reach out to [ankitkumar040722@gmail.com](mailto:ankitkumar040722@gmail.com).