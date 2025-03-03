import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/server";
import TaskPage from "./components/task-table";

export default async function Home() {
  // Get the Supabase client with auth cookies
  const supabase = await createClient();
  
  // Get the auth token from cookies
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/login')
    }

  return (
    <div className="w-full">
     <TaskPage/>
    </div>
  );
}
