import SetPasswordForm from "./components/SetPasswordForm";

interface SearchParams {
  searchParams: string;
}

export default function SetPassword({ searchParams }: SearchParams) {
  console.log("🚀 ~ SetPassword ~ searchParams:", searchParams);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="text-5xl font-bold">Set new password</p>
      <SetPasswordForm email={searchParams?.email} />
    </div>
  );
}
