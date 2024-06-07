const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


const app = express();
const PORT = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'sparkygino@gmail.com',
        pass: process.env.GMAIL_PASSWORD
    }
})

// middleware for json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

//handle event
app.post('/send-notification', (req, res) => {
    const {email, sku} = req.body;

    const mailOptions = {
        from: 'sparkygino@gmail.com',
        to: email,
        subject: 'Product Notifaction',
        text: `You subscribed on ${sku} product`
    }

transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        return res.status(500).json({message: "Error sending email"});
    }
    res.status(200).json({message: "Email sent successfully"})
});
});

//listen server
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
