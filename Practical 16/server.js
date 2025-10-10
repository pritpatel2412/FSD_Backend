const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Configure NodeMailer transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contact form submission endpoint
app.post('/send-message', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required!'
        });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please enter a valid email address!'
        });
    }

    // Prepare email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
        subject: `Portfolio Contact: ${subject}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
                    <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    <div style="margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                        <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
                        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4CAF50;">
                            <p style="margin: 0;"><strong>Message:</strong></p>
                            <p style="margin: 10px 0; line-height: 1.6;">${message}</p>
                        </div>
                    </div>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="color: #888; font-size: 12px; text-align: center;">
                        This message was sent from your portfolio website contact form.
                    </p>
                </div>
            </div>
        `,
        replyTo: email
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({
            success: true,
            message: 'Thank you! Your message has been sent successfully. I will get back to you soon!'
        });
    } catch (error) {
        console.error('Error sending email:', error);
        
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later or contact me directly.'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
