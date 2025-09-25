# Tourism Agency Laravel Template (Placeholder)

Simple starter template for a tourism agency website. This is NOT a full Laravel installation — it's a set of files you can copy into a Laravel project.

## Included Pages
- Landing page (`/`)
- About Us (`/about`)
- FAQs (`/faqs`)
- Contact Form (`/contact` GET & POST)
- Packages (`/packages`)
- Tour Schedule (`/schedule`)
- Dashboard (`/dashboard`) — admin placeholder
- Login (`/login`) — placeholder form
- Signup (`/signup`) — placeholder form

## Quick Start
1. Create a fresh Laravel project:
   ```bash
   composer create-project laravel/laravel myapp
   cd myapp
   ```
2. Copy files from this template into the Laravel project folders (routes/, app/Http/Controllers/, resources/views/, public/).
3. Adjust routes/controllers as needed. This template uses plain placeholder forms; no authentication is implemented.
4. Start server:
   ```bash
   php artisan serve
   ```

## Contact Form
The contact form POST route is set up (`/contact`) and currently returns a simple thank-you view. Replace with mail logic or DB storage as needed.
