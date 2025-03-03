"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const router = useRouter(); 
  const user = useAuth();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        return;
      }
      router.push("/login");
      toast.success("Logout Successfull");
      router.refresh();
    } catch (err) {
      console.error("Unexpected error during logout:", err);
    }
  };

  return (
    <header className="w-full bg-blue-700 text-white p-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-lg font-semibold hover:text-gray-300 transition"
      >
        Home
      </Link>
      <span className="text-sm md:text-base font-medium">{user?.user?.identities && user?.user?.identities[0]?.identity_data?.username}</span>
      <button
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm md:text-base transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
