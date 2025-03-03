"use client";

import { useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        setUser(null);
        setError(new Error(error.message));
      } else {
        setUser(data?.user ?? null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
