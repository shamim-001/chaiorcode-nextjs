import VerificationEmail from "@/components/emails/VarificationEmail";
import { resend } from "@/lib/resend";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  varifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification Code",
      react: VerificationEmail({ username, otp: varifyCode }),
    });
    return { success: true, message: "Verification email send successfully." };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
