import { redirect } from "next/navigation";
import LoginForm from "../components/sign-in-form";
import { createClient } from "../utils/supabase/server";

export default async function LoginPage() {

    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

   if (data?.user) {
     redirect('/')
   }

  return (
    <LoginForm/>
  )
}