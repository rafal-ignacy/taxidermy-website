import express, { Request, Response } from "express";
import nodemailer, { TransportOptions, SendMailOptions } from "nodemailer";
import rateLimit from "express-rate-limit";
import winston from "winston";
import dotenv from "dotenv";
import cors from "cors";
import https from "https";
import fs from "fs";

dotenv.config();

const app = express();
const port = process.env.HTTP_PORT!;

const certPath = "/etc/ssl/fullchain.pem";
const keyPath = "/etc/ssl/privkey.pem";

interface SmtpConfig extends TransportOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

const corsOptions = {
  origin: "https://taxidermypoland.com",
  methods: ["POST"],
  allowedHeaders: ["Content-Type", "Content-Length"],
};

const options = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/backend.log" }),
  ],
});

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Rate limit exceeded: ${req.ip}`);
    res.status(429).send('Rate limit exceeded');
  },
});

app.use(cors(corsOptions));
app.use(express.json({ limit: '500kb' }));
app.options("*", cors());
app.use(limiter);

async function sendEmail(
  smtpServerConfig: SmtpConfig,
  mailOptions: SendMailOptions
): Promise<void> {
  try {
    const transporter = nodemailer.createTransport(smtpServerConfig);
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email was sent: ${info.messageId} - ${info.response}`);
  } catch (error) {
    logger.error(`Error occured during email sending attempt: ${error}`);
  }
}

app.post("/contact-form", async (req: Request, res: Response) => {
  console.log(req.headers);
  console.log(req.ip);
  console.log(req.body);
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const smtpServerConfig: SmtpConfig = {
    host: process.env.SMTP_SERVER!,
    port: parseInt(process.env.SMTP_PORT!, 10),
    secure: false,
    auth: {
      user: process.env.EMAIL_LOGIN!,
      pass: process.env.EMAIL_PASSWORD!,
    },
  };

  const mailFromWebisteOptions: SendMailOptions = {
    from: process.env.SENDER_EMAIL!,
    to: process.env.RECIPIENT_EMAIL,
    subject: "Mail from taxidermypoland.com",
    html: `
      <b>Full name:</b> ${fullName}<br/>
      <b>Email:</b> ${email}<br/>
      <b>Message:</b> ${message}`,
  };

  const mailToCustomerOptions: SendMailOptions = {
    from: process.env.SENDER_EMAIL!,
    to: email,
    subject: "Taxidermy Poland - confirmation of your message submission",
    html: `
      Hello ${fullName},<br/>
      <br/>
      Thank you for contacting us! We've successfully received your message, and we'll get back to you as soon as possible.<br/>
      <br/>
      Here is a quick recap what you sent us:<br/>
      <b>Fullname:</b> ${fullName}<br/>
      <b>Email:</b> ${email}<br/>
      <b>Message:</b> ${message}<br/>
      <br/>
      We appreciate your interest, and we'll be in touch soon!<br/>
      <br/>
      Best regards,<br/>
      Taxidermy Poland`,
  };

  try {
    await sendEmail(smtpServerConfig, mailFromWebisteOptions);
    await sendEmail(smtpServerConfig, mailToCustomerOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email" });
  }
});

https.createServer(options, app).listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
