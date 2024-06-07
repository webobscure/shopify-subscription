const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'sparkygino@gmail.com',
    pass: process.env.GMAIL_PASSWORD || 'sbcd sttw xbll iqnd' // Убедитесь, что переменная окружения установлена или замените на пароль для проверки
  }
});

// middleware for json
app.use(express.json());
app.use(cors());

// handle event
app.post('/send-notification', (req, res) => {
  const { email, sku, nickname } = req.body;

  const mailOptions = {
    from: 'sparkygino@gmail.com',
    to: email,
    subject: 'Product Notification',
    text: `Simplify Your Life with Our Product Subscription!`,
    html: `
     <p>Dear ${nickname},</p>

        <p>We are excited to introduce our new subscription service for ${sku}, designed to provide you with continuous access to the products you love without the hassle of reordering.</p>

        <h3>Why Subscribe?</h3>
        <ul>
            <li><strong>Convenience:</strong> Get ${sku} delivered to your door at regular intervals that suit your schedule.</li>
            <li><strong>Savings:</strong> Enjoy exclusive discounts and special offers available only to subscribers.</li>
            <li><strong>Flexibility:</strong> Easily adjust your delivery frequency, skip a delivery, or cancel anytime.</li>
            <li><strong>Priority Service:</strong> Be the first to know about new products, special events, and limited-time promotions.</li>
        </ul>

        <h3>How It Works:</h3>
        <ol>
            <li><strong>Choose Your Product:</strong> Select the ${sku} you want to receive regularly.</li>
            <li><strong>Set Your Schedule:</strong> Pick a delivery frequency that matches your usage.</li>
            <li><strong>Relax and Enjoy:</strong> Receive your ${sku} automatically, so you never run out.</li>
        </ol>

        <h3>Special Offer:</h3>
        <p>Sign up today and receive an additional 10% off your first subscription order! Use code <strong>SUBSCRIBE10</strong> at checkout.</p>


        <p>Thank you for being a valued customer. We look forward to serving you through our new subscription service.</p>

        <p>Best regards,</p>
        <p>Alex<br>
        Onkron Technologies<br>
        <a href="https://onkron-uk.co.uk/">ONKRON UK</a></p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error); // Логирование ошибки
      return res.status(500).json({ message: 'Error sending email' });
    }
    console.log('Email sent:', info.response); // Логирование успешной отправки
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

// listen server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
