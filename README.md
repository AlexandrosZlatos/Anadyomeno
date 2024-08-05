## Anadyomeno
This project is about Anadyomeno, a clothing brand company. 
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AlexandrosZlatos/Anadyomeno.git
2. Navigate into the project directory:
   ```bash
   cd Anadyomeno
3. Install the dependencies:
   ```bash
   npm install
   
## USAGE
1. Start the server:
   ```bash
   node app.js
And you are ready to go
## DISCLAIMER
In the app.js file, there are some empty fields you need to fill.
1. First one:
   ```bash
   const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
    });
 This one, for example, is for a local database, where when you upload something from the uploads.html file, the data is stored. I use MySQL Workbench.
2. Second one:
    ```bash
    
    app.post('/send', (req, res) => {
    const { name, email, phone, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., Gmail, Yahoo, etc.
        auth: {
            user: '', // Replace with your email
            pass: '', // Replace with your app password
        },
    });

    // Email options
    const mailOptions = {
        from: email,
        to: '', // Replace with your target email
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };
  This one is to send the contact form data to your email  

## DISCLAIMER NUMBER 2
This project is still on progress!            
