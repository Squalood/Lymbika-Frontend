import { SignupForm } from "@/components/forms/signup-form";

export default function SingUoRoute() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-3xl">
          <SignupForm />
        </div>
    </div>
  )
  
}