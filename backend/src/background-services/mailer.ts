import { createTransporter } from "../config/mailConfig";
import ejs from "ejs";
import { Cart } from "../interfaces/cart";

const sendEmail = (
  templateName: string,
  templateData: any,
  email: string,
  subject: string
) => {
  const transporter = createTransporter();

  ejs.renderFile(
    `${__dirname}/../../src/views/${templateName}.ejs`,
    templateData,
    async (err, template) => {
      if (err) {
        console.log("Error sending mail: ", err);
        return;
      }
      const mailOptions = {
        from: process.env.USER,
        to: email,
        subject: subject,
        html: template,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent");
      } catch (error) {
        console.log("Error sending email");
      }
    }
  );
};

export const sendWelcomeEmail = (email: string, name: string) => {
  const subject = "Welcome to Men's Shoppie";
  sendEmail("welcomeNewUsers", { name: name }, email, subject);
};

export const sendOrderPlacedEmail = (
  email: string,
  name: string,
  order: Cart[]
) => {
  const subject = "Order placed Successfully";
  sendEmail("orderPlaced", { order, name }, email, subject);
};
