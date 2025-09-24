# Laravel Auth Template

This is a Laravel template with **authentication** (login, signup, logout) and basic public/private pages.

## Features
- **Public pages** (no login required):
  - Landing (`/`)
  - FAQs (`/faqs`)
  - About Us (`/about`)
  - Contact Us (`/contact`)

- **Authentication**:
  - Signup (`/signup`) – create a new account
  - Login (`/login`) – log in with email & password
  - Logout (`/logout`) – end session
  - Passwords are hashed using Laravel’s built-in `Hash`

- **Private pages** (require login):
  - Dashboard (`/dashboard`)
  - Calendar (`/calendar`)

## Installation
1. Create a new Laravel project:
   ```bash
   composer create-project laravel/laravel myapp
   cd myapp

2. composer install
3. Set up your .env file (use .env.example as a guide) and configure your database connection.
4. php artisan migrate
5. php artisan serve
