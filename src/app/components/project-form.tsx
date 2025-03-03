"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "../utils/supabase/client";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
// import { useEffect } from "react";

const projectSchema = z.object({
  projectName: z.string().min(3, "Project Name must be at least 3 characters"),
  projectDescription: z.string().min(10, "Description must be at least 10 characters"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectForm() {
//   const initialValues = {
//     projectName: "Anshu",
//     projectDescription : "Hello"
//   }

let initialValues;

  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    // defaultValues: initialValues || { projectName: "", projectDescription: "" },
  });
  const [userId, setUserId] = useState<string>("");
  // Set initial values when editing
//   useEffect(() => {
//     if (initialValues) {
//       setValue("projectName", initialValues?.projectName);
//       setValue("projectDescription", initialValues?.projectDescription);
//     }
//   }, [initialValues, setValue]);


const onSubmit = async (data: ProjectFormValues) => {
    const supabase = await createClient();
    const { error } = await supabase
      .from('project')
      .insert({ name: data.projectName, description: data.projectDescription, user_id: userId });
    if (error) {
      console.error("Error inserting data:", error.message);
      toast.error(error.message || "Something went wrong!");
    } else {
      console.log("Project added successfully!");
      toast.success("Project added successfully!");
    }
  };

useEffect(()=>{
   const  getUserData = async()=>{
        const supabase = await createClient()
        const { data, error } = await supabase.auth.getUser()
        if(data?.user?.identities){
            setUserId(data?.user?.identities[0]?.user_id)
            console.log("data", data?.user?.identities[0]?.user_id);
        }  
        console.log("error", error);
     }
     getUserData()
  })

  
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
        {initialValues ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
}
