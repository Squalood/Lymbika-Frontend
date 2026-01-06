import { SigninForm } from "@/components/forms/signin-form";

export default async function SingInRoute({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;

  return(
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SigninForm callbackUrl={params.callbackUrl} />
      </div>
    </div>
  )
}