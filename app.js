const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Import Nodemailer

const productRoutes = require('./routes/products');
const dbCheckRoute = require('./routes/dbCheck');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'arisdoxa12',
    database: 'anadyomeno'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

module.exports = db;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve specific static files
app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.js'));
});

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Set storage engine for Multer to retain the original filename
const storage = multer.diskStorage({
    destination: uploadsDir,
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Use the original name of the file
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 } // Limit file size to 5MB
}).single('image');

app.use('/uploads', express.static(uploadsDir));

// Route to handle form submission
app.post('/send', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., Gmail, Yahoo, etc.
        auth: {
            user: 'zlatos.ale@gmail.com', // Replace with your email
            pass: 'cyzd mckt nzwv jcoy', // Replace with your app password
        },
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'zlatos.ale@gmail.com', // Replace with your target email
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Existing product upload and image fetching routes

app.post('/api/products', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).json({ error: 'Error uploading file.' });
        }
        if (!req.file) {
            console.error('No file selected.');
            return res.status(400).json({ error: 'No file selected.' });
        }

        const { name, description, price, stockQuantity } = req.body;
        const imageData = { path: `/uploads/${req.file.filename}` };
        console.log('Uploaded file path:', imageData.path);

        // Insert the product data into the database
        const sql = 'INSERT INTO products (name, description, price, stockQuantity, imageUrl) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [name, description, price, stockQuantity, imageData.path], (err, result) => {
            if (err) {
                console.error('Error inserting product data:', err);
                return res.status(500).json({ error: 'Error saving product data.' });
            }

            // Save image data to images.json
            let existingData = [];
            const imagesJsonPath = path.join(uploadsDir, 'images.json');

            try {
                if (fs.existsSync(imagesJsonPath)) {
                    existingData = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf-8'));
                    if (!Array.isArray(existingData)) {
                        console.log('images.json is not an array. Reinitializing it as an empty array.');
                        existingData = [];
                    }
                }
            } catch (err) {
                console.error('Error reading images.json:', err);
                existingData = [];
            }

            existingData.push(imageData);

            try {
                fs.writeFileSync(imagesJsonPath, JSON.stringify(existingData, null, 2), 'utf-8');
                res.status(200).json({ message: 'Product uploaded successfully.', filePath: imageData.path });
            } catch (err) {
                console.error('Error writing to images.json:', err);
                res.status(500).json({ error: 'Error saving file data.' });
            }
        });
    });
});

app.get('/api/images', (req, res) => {
    const imagesJsonPath = path.join(uploadsDir, 'images.json');

    try {
        if (fs.existsSync(imagesJsonPath)) {
            const images = fs.readFileSync(imagesJsonPath, 'utf-8');
            let imageArray = JSON.parse(images);
            if (!Array.isArray(imageArray)) {
                console.log('images.json is not an array. Reinitializing it as an empty array.');
                imageArray = [];
            }
            console.log('Images fetched from JSON:', imageArray);
            res.json(imageArray);
        } else {
            console.log('No images found.');
            res.json([]);
        }
    } catch (err) {
        console.error('Error reading images.json:', err);
        res.json([]);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
