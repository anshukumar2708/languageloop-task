'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

type IFormData = {
  email: string,
  password: string,
  username : string,
}

export async function signup(formData: IFormData) {

  const supabase = await createClient()
  const inputData = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        username : formData.username
      }
    }
  }

  const { error } = await supabase.auth.signUp(inputData)

  if (error) {
    return { success: false, message: error.message };
  }else{
    // revalidatePath('/login', 'layout');
    // redirect('/login');
    return { success: true, message: "Signup successful please check mail!" };
  }
}
