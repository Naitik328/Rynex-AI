// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import crypto from "crypto";
// import { promisify } from "util";

// // Load environment variables
// dotenv.config();

// // Create transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // In-memory store for verification tokens (in production, use a database)
// let verificationTokens = new Map();

// // Function to generate verification token
// const generateVerificationToken = () => {
//   return crypto.randomBytes(20).toString("hex");
// };

// // Function to send verification email
// const sendVerificationEmail = async (email, verificationToken) => {
//   const verificationUrl = `http://yourdomain.com/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Email Verification",
//     html: `
//       <h1>Email Verification</h1>
//       <p>Please verify your email by clicking the link below:</p>
//       <a href="${verificationUrl}">${verificationUrl}</a>
//       <p>This link will expire in 1 hour.</p>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Verification email sent successfully");
//     return true;
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     throw new Error("Failed to send verification email");
//   }
// };

// // Function to verify email
// const verifyEmail = async (token, email) => {
//   const storedToken = verificationTokens.get(email);
  
//   if (!storedToken || storedToken !== token) {
//     throw new Error("Invalid or expired verification token");
//   }

//   // Mark email as verified (in production, update database)
//   verificationTokens.delete(email);
//   return true;
// };

// // Function to handle user registration with email verification
// const registerUser = async (userData) => {
//   const { email } = userData;
  
//   // Check if email is already verified
//   if (verificationTokens.has(email)) {
//     throw new Error("Pending verification. Please check your email.");
//   }

//   // Generate new verification token
//   const verificationToken = generateVerificationToken();
  
//   // Store token with 1-hour expiration
//   verificationTokens.set(email, verificationToken);
  
//   // Send verification email
//   await sendVerificationEmail(email, verificationToken);

//   return {
//     message: "Verification email sent. Please check your inbox.",
//     email: email
//   };
// };

// // Example usage middleware or route handler
// /*
// app.post('/register', async (req, res) => {
//   try {
//     const result = await registerUser(req.body);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.get('/verify-email', async (req, res) => {
//   try {
//     await verifyEmail(req.query.token, req.query.email);
//     res.status(200).send("Email verified successfully! You can now log in.");
//   } catch (error) {
//     res.status(400).send("Invalid or expired verification link.");
//   }
// });
// */

// export default {
//   transporter,
//   registerUser,
//   verifyEmail,
//   sendVerificationEmail
// };