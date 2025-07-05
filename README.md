# 🚀 Cosmic Explorer

Cosmic Explorer is a full-stack web application that brings together the latest space news, user-generated blogs, and live space tracking features in one seamless platform.

## 🌟 Features

### Frontend
- Built with **React** to deliver a fast and responsive UI.
- State management using **Redux** for predictable state handling.
- Async actions handled by **Redux Thunk** middleware for smooth API calls.
- API communication handled via **Axios**.
- Secure user authentication implemented with JWT tokens, enabling users to register, log in, and maintain sessions securely.

### Backend
- Developed with **Django REST Framework (DRF)** to provide robust, RESTful APIs.
- PostgreSQL serves as the reliable relational database.
- Dockerized backend and database for environment consistency and easy deployment.
- **Gunicorn** serves as the production WSGI server, handling requests efficiently.

### Application Features
- **User Authentication & Authorization:** JWT-based login system ensures secure access.
- **Space News Section:** Displays paginated news articles fetched in real-time from the public [Spaceflight News API](https://api.spaceflightnewsapi.net/v4/articles) (limited to 12 per page).
- **User Blogs:** Authenticated users can create, edit, delete, and browse blog posts written by themselves and others.
- **ISS Tracker:** Real-time location tracking of the International Space Station, sourced from external APIs.
- **Star Finder:** Users can explore stars by integrating with external astronomy data providers.

---

## 🛠️ Technologies Used

| Frontend                      | Backend                      | Tools & Deployment           |
|------------------------------|------------------------------|-----------------------------|
| React                        | Django REST Framework (DRF) | Docker                      |
| Redux                       | PostgreSQL                   | Gunicorn                    |
| Redux Thunk                 | JWT Authentication          | Git                         |
| Axios                       | Python                      | VS Code                     |

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- Docker and Docker Compose installed

