import SetPasswordForm from "./components/SetPasswordForm";

interface SearchParams {
  searchParams: { token: string; email: string };
}

export default function SetPassword({ searchParams }: SearchParams) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="text-4xl font-bold">Set new password</p>
      <SetPasswordForm
        email={searchParams?.email}
        token={searchParams?.token}
      />
    </div>
  );
}
