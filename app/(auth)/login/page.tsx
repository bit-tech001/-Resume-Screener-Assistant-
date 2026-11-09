
import type { Metadata } from "next";

import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in | Synthweb",
  description: "Sign in to the Synthweb resume screening workspace.",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to screen candidates and review AI-generated reports."
      footer="Only submit candidate information you are authorized to process."
    >
      <LoginForm />
    </AuthCard>
  );
}
