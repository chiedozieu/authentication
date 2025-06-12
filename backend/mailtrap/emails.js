import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [
    {
      email,
    },
  ];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Failed to send verification email", error);
    throw new Error("Failed to send verification email", error.message);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [
    {
      email,
    },
  ];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "ac0764e0-3c8e-492d-8ce5-fddd033c0f29",
      template_variables: {
        name: name,
        company_info_name: "Nabata",
      },
    });
    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    console.log("Failed to send welcome email", error);
    throw new Error("Failed to send welcome email", error.message);
  }
};
