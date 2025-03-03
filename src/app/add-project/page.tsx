import ProjectForm from "../components/project-form";

export default function AddProjectPage() {
    
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Project</h1>
        <ProjectForm />
      </div>
    </div>
  );
}
