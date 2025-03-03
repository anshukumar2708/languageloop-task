import Link from "next/link";

interface HeaderProps {
  title: string;
  addButtonPath: string;
  buttonTitle: string;
}

export default function BreadCrumb({ title, addButtonPath, buttonTitle }: HeaderProps) {
  // const router = useRouter();

  console.log(addButtonPath);

  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Link href={addButtonPath} className="bg-blue-500 font-bold py-2 px-5 rounded-md text-white">{buttonTitle}</Link>
    </div>
  );
}
