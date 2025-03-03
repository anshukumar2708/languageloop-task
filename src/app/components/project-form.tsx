"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "../utils/supabase/client";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const projectSchema = z.object({
  projectName: z.string().min(3, "Project Name must be at least 3 characters"),
  projectDescription: z.string().min(10, "Description must be at least 10 characters"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectForm() {
  const { id } = useParams();
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { projectName: "", projectDescription: "" },
  });

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return; 
      const supabase = createClient();
      const { data, error } = await supabase.from("project").select("*").eq("id", id).single();

      if (error) {
        console.error("Error fetching project:", error.message);
        toast.error("Failed to fetch project details.");
      } else if (data) {
        console.log("Fetched project:", data);
        reset({
          projectName: data.name,
          projectDescription: data.description,
        });
      }
    };
    fetchProject();
  }, [id, reset]);

  useEffect(() => {
    const getUserData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (data?.user?.id) {
        setUserId(data.user.id);
      }
      if (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    getUserData();
  }, []);

  const onSubmit = async (data: ProjectFormValues) => {
    const supabase = createClient();
    if (id) {
      const { error } = await supabase
        .from("project")
        .update({ name: data.projectName, description: data.projectDescription })
        .eq("id", id);

      if (error) {
        console.error("Error updating project:", error.message);
        toast.error("Failed to update project.");
      } else {
        toast.success("Project updated successfully!");
      }
    } else {
      const { error } = await supabase
        .from("project")
        .insert({ name: data.projectName, description: data.projectDescription, user_id: userId });

      if (error) {
        console.error("Error inserting data:", error.message);
        toast.error("Something went wrong!");
      } else {
        toast.success("Project added successfully!");
      }
    }
    router.push("/")
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Name</label>
        <input
          {...register("projectName")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Description</label>
        <textarea
          {...register("projectDescription")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        {errors.projectDescription && <p className="text-red-500 text-sm">{errors.projectDescription.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {id ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
}
