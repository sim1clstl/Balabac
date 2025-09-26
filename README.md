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

# Laravel Website Setup (with XAMPP)

This guide explains how to set up and run this Laravel project using **XAMPP** on your local machine.

---

## Requirements
- [XAMPP](https://www.apachefriends.org/download.html) (Apache + MySQL)
- [Composer](https://getcomposer.org/)
- [Node.js + npm](https://nodejs.org/)

---

## Installation

1. **Clone or copy the project**
   ```bash
   cd C:/xampp/htdocs
   git clone <your-repo-url> mysite
   cd mysite
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Environment setup**
   - Copy `.env.example` to `.env`
   - Generate app key:
     ```bash
     php artisan key:generate
     ```

4. **Database**
   - Open [phpMyAdmin](http://localhost/phpmyadmin)
   - Create a new database (e.g., `mysite_db`)
   - Update `.env` file:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=mysite_db
     DB_USERNAME=root
     DB_PASSWORD=
     ```

5. **Run migrations**
   ```bash
   php artisan migrate
   ```

6. **Start development server**
   ```bash
   php artisan serve
   ```
   Visit: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## Optional (Virtual Host Setup with XAMPP)

1. Edit `C:\xampp\apache\conf\extra\httpd-vhosts.conf`:
   ```apache
   <VirtualHost *:80>
       ServerName mysite.test
       DocumentRoot "C:/xampp/htdocs/mysite/public"
       <Directory "C:/xampp/htdocs/mysite/public">
           Require all granted
           AllowOverride All
       </Directory>
   </VirtualHost>
   ```

2. Edit `C:\Windows\System32\drivers\etc\hosts`:
   ```
   127.0.0.1 mysite.test
   ```

3. Restart Apache, then visit [http://mysite.test](http://mysite.test).

---

## Frontend

Run Laravel Mix / Vite build:
```bash
npm run dev   # development
npm run build # production
```

---

## Useful Commands

- `php artisan route:list` → View all routes  
- `php artisan make:controller NameController` → Create a controller  
- `php artisan make:model Name -m` → Create model with migration  
- `php artisan migrate:fresh --seed` → Reset database  

---

## License
This project is open-source under the [MIT License](LICENSE).
