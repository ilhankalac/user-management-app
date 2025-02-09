# User Managment app

This application is deployed using Firebase, and you can check it online:
[User Management App](https://user-management-app-2c484.web.app/users)

## Project Structure

- **Initial Setup**
  - Removed unnecessary default files (e.g., About, Home, etc.).
  
- **API Service**
  - Implemented a reusable `ApiService` class for handling API requests.
  
- **Layout**
  - Created `AppLayout.vue` as the main layout and integrated it into the router.
  
- **TypeScript Support**
  - Added a `User` TypeScript class defining API fields and required properties.
  - Defined additional data types in `other.d.ts` for use across the application.

- **Composable Functions**
  - Created `useFetchData` composable for handling user-related API operations.

- **Components**
  - `Users.vue`: Main view that includes `UsersTable.vue` to display users.
  - `UserDetails.vue`: Simple component for displaying user details.

## Features

- **Maintainable Codebase**: The structure allows for easy expansion and addition of new features.
- **Responsive Design**: Fully responsive, optimized for all devices.

This project is structured to be easily extendable and scalable.

