import React from 'react'
import { createClient } from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation';
import TaskList from '@/app/components/task-list';

const TaskManagement = async() => {
  // Get the Supabase client with auth cookies
  const supabase = await createClient();
    
  // Get the auth token from cookies
  const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        redirect('/login')
   }

  return (
    <TaskList/>
  )
}

export default TaskManagement;