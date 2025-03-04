'use client';

import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Table from './table';
import BreadCrumb from './breadcrumb';
import { createClient } from '../utils/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export type IData = {
  created_at: string;
  description: string;
  id: string; 
  name: string;
  user_id: string;
};

export default function ProjectList() {
  const [data, setData] = useState<IData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const router = useRouter();

   // Delete Project by ID
   const handleDelete = async (event:React.MouseEvent,id: string) => {
    setDeleteLoading(true);
    event.stopPropagation();
    const supabase = createClient();
    const { error } = await supabase.from("project").delete().eq("id", id);
    if (error) {
      console.error("Error deleting:", error.message);
      toast.success(error.message);
    } else {
      console.log("Project deleted successfully!");
      toast.success("Project deleted successfully!");
      setData((prev) => prev.filter((project) => project.id !== id));
    }
    setDeleteLoading(false);
  };

  const UpdateHandler = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    router.push(`/update-project/${id}`);
  };

  const columns: ColumnDef<IData>[] = [
    { accessorKey: 'name', header: () => 'Name' },
    { accessorKey: 'description', header: () => 'Description' },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button 
             onClick={(event) => UpdateHandler(event, row.original.id)} className='px-4 py-2 bg-blue-500 text-white rounded'>Update</button>
          <button 
             onClick={(event) => handleDelete(event, row.original.id)}
             className='px-4 py-2 bg-blue-500 text-white rounded'
             >
               {deleteLoading ? "Loading"  : "Delete"}
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.from('project').select('*');
      if (error) console.error(error);
      else setData(data);
    };
    fetchTasks();
    setLoading(false);
  }, []);

  return (
    <div className="w-full">
      <BreadCrumb title="Project List" addButtonPath="/add-project" buttonTitle="Add Project" />
      {loading && <div className='w-full h-[60vh] flex justify-center items-center'><h1>Loading...</h1></div> }
      {!loading &&<Table columns={columns} data={data} rowClickPath="task-management" />}
    </div>
  );
}
