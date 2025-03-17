const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    try {
        const { name, email, message } = JSON.parse(event.body);

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // ✅ Uses Netlify Environment Variable
                pass: process.env.EMAIL_PASS  // ✅ Uses Netlify Environment Variable
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: "zlatos.ale@gmail.com", // ✅ Only recipient email is hardcoded
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully!" })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
