import ProjectForm from "@/app/components/project-form";


export default function AddProjectPage() {
    
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Project</h1>
        <ProjectForm />
      </div>
    </div>
  );
}