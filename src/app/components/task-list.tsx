'use client';

import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import BreadCrumb from '@/app/components/breadcrumb';
import Table from '@/app/components/table';
import { useParams } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import { toast } from 'react-toastify';
import Link from 'next/link';

export type ITaskData = {
    created_at: string;
    id: string; 
    project_id: string;
    status: string; 
    title: string; 
 };

export default function TaskList() {
  const [data, setData] = useState<ITaskData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { projectId } = useParams();
  
   // Delete Project by ID
   const handleDelete = async ( id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("task_management").delete().eq("id", id);
    if (error) {
      console.error("Error deleting:", error.message);
      toast.success(error.message);
    } else {
      console.log("Task deleted successfully!");
      toast.success("Task deleted successfully!");
      setData((prev) => prev.filter((project) => project.id !== id));
    }
  };

  const columns: ColumnDef<ITaskData>[] = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "status", header: "Status" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link href={`/update-task-management/${row.original.id}`} className='px-4 py-2 bg-blue-500 text-white rounded'>Update</Link>
          <button onClick={() => handleDelete(row.original.id)} className='px-4 py-2 bg-blue-500 text-white rounded'>Delete</button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("task_management")
        .select("*")
        .eq("project_id", projectId);
  
      if (error) {
        console.error(error);
      } else {
        setData(data || []);
      }
      setLoading(false);
    };
    if (projectId) fetchTasks();
  }, [projectId]); 

  return (
    <div className="w-full">
      <BreadCrumb 
       title="Task List" 
       addButtonPath={`/add-task-management/${projectId}`} 
       buttonTitle="Add Task" 
     />
     {loading ? 
      <div className='w-full h-[60vh] flex justify-center items-center'>
         <h1>Loading...</h1>
        </div>  
        :
      <Table columns={columns} data={data} />}
    </div>
  );
}
