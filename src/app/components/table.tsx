import { useParams, useRouter } from 'next/navigation';
import { getCoreRowModel, flexRender, useReactTable, ColumnDef } from '@tanstack/react-table';

type IProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  rowClickPath?: string;
};


export default function Table<T>({ columns, data, rowClickPath }: IProps<T>) {
  const router = useRouter();
  const {projectId} = useParams();
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (id: string) => {
    if (!projectId && rowClickPath) { 
      router.push(`/${rowClickPath}/${id}`);
    } else {
      console.error("error");
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-3 text-left border border-gray-300">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(row?.original?.id as string)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-3 border border-gray-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
