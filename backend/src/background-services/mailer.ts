import { createTransporter } from "../config/mailConfig";
import ejs from "ejs";
import { UserRegister } from "../interfaces/auth";
import { TicketFinal } from "../interfaces/ticket";

const sendEmail = (
  templateName: string,
  templateData: any,
  email: string,
  subject: string
) => {
  const transporter = createTransporter();
  ejs.renderFile(
    `${__dirname}/../../src/views/${templateName}.ejs`,
    { ...templateData },
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

export const sendTicketBookedEmail = (email: string, ticket: TicketFinal) => {
  const subject = "Organizer Registration Approval";
  sendEmail("ticket", ticket, email, subject);
};

export const sendApproveOrganizerEmail = (
  email: string,
  organizer: UserRegister
) => {
  const subject = "Organizer Registration Approval";
  sendEmail("verifyOrganizer", organizer, email, subject);
};

export const sendWelcomeApprovedOrganizerEmail = (
  email: string,
  name: string
) => {
  const subject = "Your registration has been approved";
  sendEmail("welcomeApprovedOrganizer", { name: name }, email, subject);
};

export const sendWelcomeNewOrganizerEmail = (email: string, name: string) => {
  const subject = "Welcome to Plana";
  sendEmail("welcomeNewOrganizer", { name: name }, email, subject);
};

export const sendWelcomeNewUsersEmail = (email: string, name: string) => {
  const subject = "Welcome to Plana";
  sendEmail("welcomeNewUsers", { name: name }, email, subject);
};

export const sendOrderPlacedEmail = (
  email: string,
  name: string
  // order: Cart[]
) => {
  const subject = "Order placed Successfully";
  sendEmail("orderPlaced", { name }, email, subject);
};
