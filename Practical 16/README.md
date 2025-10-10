# Freelance Portfolio Website with Contact Form

A professional freelance portfolio website with a fully functional contact form that sends emails using **NodeMailer** in **Express.js**.

## 🌟 Features

- ✨ Modern and responsive design
- 📧 Contact form with email functionality using NodeMailer
- ✅ Client-side and server-side validation
- 🎨 Beautiful UI with smooth animations
- 📱 Mobile-friendly responsive layout
- ⚡ Real-time form validation
- 🔔 Success/failure message notifications
- 🎯 Clean and organized code structure

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js installed (v14 or higher)
- npm (Node Package Manager)
- A Gmail account (or other email service)
- Gmail App Password (for Gmail users)

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

1. Copy `.env.example` to create a new `.env` file:
   ```bash
   copy .env.example .env
   ```

2. Open `.env` and configure your email settings:

   ```env
   PORT=3000
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   RECIPIENT_EMAIL=your-email@gmail.com
   ```

### 3. Generate Gmail App Password (For Gmail Users)

**Important:** You MUST use an App Password, not your regular Gmail password.

Steps:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and your device
5. Copy the generated 16-character password
6. Paste it in the `EMAIL_PASSWORD` field in your `.env` file (no spaces)

### 4. Run the Application

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### 5. Open in Browser

Navigate to: `http://localhost:3000`

## 📁 Project Structure

```
Practical 16/
│
├── public/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styling
│   └── script.js           # Client-side JavaScript
│
├── server.js               # Express server with NodeMailer
├── package.json            # Dependencies
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🎯 How It Works

### Contact Form Flow:

1. **User fills out the form** with name, email, subject, and message
2. **Client-side validation** checks for:
   - Valid email format
   - Minimum field lengths
   - Required fields
3. **Form data is sent** to the server via AJAX
4. **Server-side validation** re-validates the data
5. **NodeMailer sends the email** to your configured email address
6. **User receives feedback** with success or failure message

### Form Validation Rules:

- **Name:** Minimum 2 characters
- **Email:** Valid email format (name@domain.com)
- **Subject:** Minimum 3 characters
- **Message:** Minimum 10 characters

## 🔧 Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - NodeMailer
  - dotenv (environment variables)
  - body-parser

- **Frontend:**
  - HTML5
  - CSS3 (with animations)
  - Vanilla JavaScript (ES6+)
  - Font Awesome icons

## 📧 Email Features

- Professional HTML email template
- Sender information (name, email)
- Subject line
- Message body
- Reply-to functionality
- Styled email format

## 🎨 Customization

### Change Colors:
Edit CSS variables in `public/style.css`:
```css
:root {
    --primary-color: #4CAF50;
    --secondary-color: #2196F3;
    --dark-color: #333;
    /* ... more colors */
}
```

### Update Content:
Edit `public/index.html` to change:
- Portfolio information
- Skills and services
- Contact details
- Social media links

### Email Template:
Modify the email HTML in `server.js` (mailOptions section)

## ⚠️ Important Notes

1. **Never commit `.env` file** to version control
2. **Use App Password** for Gmail (not regular password)
3. **Enable 2-Step Verification** for Gmail
4. **Test email configuration** before deployment
5. **Check spam folder** if emails aren't received

## 🐛 Troubleshooting

### Emails not sending?
- Verify your email credentials in `.env`
- Check if you're using App Password (for Gmail)
- Ensure 2-Step Verification is enabled (for Gmail)
- Check server console for error messages

### Form not submitting?
- Open browser console (F12) for JavaScript errors
- Check network tab for failed requests
- Verify server is running

### Validation errors?
- Ensure all required fields are filled
- Check email format
- Verify minimum character requirements

## 📝 Assignment Details

- **Student Name:** Dhairya Kanabar
- **Practical Number:** 16
- **Topic:** Contact form with NodeMailer email functionality

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

**Dhairya Kanabar**

---

**Happy Coding! 🚀**
