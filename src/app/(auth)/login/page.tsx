import AuthForm from "@/components/ui/AuthForm";
import Welcome from "@/components/ui/Welcome";

export default function LoginPage() {
    return (
      <div className="flex min-h-screen">
        <AuthForm />
        <Welcome />
      </div>
    )
}