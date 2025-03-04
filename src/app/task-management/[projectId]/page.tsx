'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import Button from '@/app/components/button';
import BreadCrumb from '@/app/components/breadcrumb';
import Table from '@/app/components/table';
import { useParams } from 'next/navigation';

const initialData = [
  { id: 1, name: 'Item 1', description: 'Description for item 1' },
  { id: 2, name: 'Item 2', description: 'Description for item 2' },
  { id: 3, name: 'Item 3', description: 'Description for item 3' },
];

export default function TaskManagement() {
  const [data, setData] = useState(initialData);
  const { projectId } = useParams();

  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
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

  return (
    <div className="w-full">
      <BreadCrumb 
       title="Task List" 
       addButtonPath={`/add-task-management/${projectId}`} 
       buttonTitle="Add Task" 
     />
      {/* <Table columns={columns} data={data} /> */}
    </div>
  );
}
