import React from 'react'
import TaskManagementForm from '@/app/components/task-mangement-form';
import { createClient } from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation';

const UpdateTaskMangement = async() => {
// Get the Supabase client with auth cookies
const supabase = await createClient();
    
// Get the auth token from cookies
const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
      redirect('/login')
  }
return (
  <TaskManagementForm/>
)
}

export default UpdateTaskMangement;