import { signIn } from "@/auth";
// import { redirect } from "next/navigation";

const Login = () => {
  return (
    <form
      action={async (formData) => {
        "use server";

        try {
          const res = await signIn("credentials", formData);
          console.log("Response: ", res);
          // if (res == null) {
          //   redirect(`/register`);
          // }
        } catch (error) {
          console.log("Login error: ", error);
        }
      }}
      className="flex h-screen flex-col items-center justify-center gap-10 text-black"
    >
      <div className="flex flex-col">
        <label>Email</label>
        <input name="email" type="email" />
      </div>

      <div className="flex flex-col">
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button className="rounded-lg border p-2 text-white">Sign In</button>
    </form>
  );
};

export default Login;
