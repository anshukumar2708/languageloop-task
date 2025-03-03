'use server'

import { createClient } from '../utils/supabase/server'

type IFormData = {
  email: string,
  password: string,
}

export async function login(formData: IFormData) {
  const supabase = await createClient();

  const inputData = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signInWithPassword(inputData)

  if (error) {
    console.log("Login error:", error);
    return { success: false, message: error.message };
  }
  return { success: true, message: "Login successful!" };
}

