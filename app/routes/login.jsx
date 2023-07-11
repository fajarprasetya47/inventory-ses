import { redirect } from "@remix-run/node";
import LoginLayout from "../components/Login/LoginLayout";
import { login, requireUserSession } from "../data/auth.server";

export default function Login() {
  return (
    <>
      <LoginLayout />
    </>
  )
}

// export async function loader({request}) {
//   const userId = await requireUserSession(request);
//   if(userId) return redirect('/');
//   return { userId };
// }

export async function action({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return await login(data);
}