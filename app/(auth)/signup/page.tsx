
import type { Metadata } from "next";

import AuthCard from "@/components/auth/AuthCard";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create account | Synthweb",
  description:
    "Create a Synthweb account to start AI-powered resume screening.",
};

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Set up the HR workspace and start screening candidates in minutes."
      footer="Passwords are stored securely and never shared."
    >
      <SignupForm />
    </AuthCard>
  );
}
