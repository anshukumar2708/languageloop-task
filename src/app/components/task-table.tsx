'use client';

import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Table from './table';
import Button from './button';
import BreadCrumb from './breadcrumb';
import { createClient } from '../utils/supabase/client';

export default function TaskPage() {
  const [data, setData] = useState<any[]>([]);
 
  const handleDelete = (id: number) => {
    // setData((prevData) => prevData.filter((item) => item.id !== id));
    console.log(id);

  };

  const columns: ColumnDef<{ id: number; name: string; description: string }>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'description', header: 'Description' },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button onClick={() => alert(`Viewing ${row.original.name}`)}>View</Button>
          <Button onClick={() => alert(`Updating ${row.original.name}`)}>Update</Button>
          <Button onClick={() => handleDelete(row.original.id)}>Delete</Button>
        </div>
      ),
    },
  ];

 
  useEffect(() => {
    const fetchTasks = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.from('project').select('*');
      console.log("data", data)
      if (error) console.error(error);
      else setData(data);
    };
    fetchTasks();
  }, []);


  return (
    <div className="w-full">
      <BreadCrumb title="Project List" addButtonPath="/add-project" buttonTitle="Add Project"/>
      <Table columns={columns} data={data} rowClickPath="task-management"/>
    </div>
  );
}
