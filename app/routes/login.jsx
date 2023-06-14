import LoginLayout from "../components/Login/LoginLayout";
import { login } from "../data/auth.server";

export default function Login() {
  return (
    <>
      <LoginLayout />
    </>
  )
}

export async function action({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return await login(data);
}