import { redirect } from "next/navigation";
import SignupForm from "../components/sigin-up-form";
import { createClient } from "../utils/supabase/server";
export default async function LoginPage() {

const supabase = await createClient();
const { data } = await supabase.auth.getUser();
if (data?.user) {
      redirect('/')
  }

  return (
    <SignupForm/>
  )
}
