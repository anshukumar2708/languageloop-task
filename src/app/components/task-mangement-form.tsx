"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { toast } from "react-toastify";

const statusOptions =[
    { key: "Completed",
        value: "completed"
       },
   { key: "Pending",
    value: "pending"
   },
   { key: "In Progress",
    value: "in_progress"
   }
]

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    status: z.enum(["completed", "pending", "in_progress"], {
      required_error: "Status is required",
    }),
  });

type FormData = z.infer<typeof formSchema>;

export default function TaskManagementForm({ initialData }: { initialData?: FormData }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const {projectId, id} = useParams();

    const onSubmit = async (data: FormData) => {
      const supabase = createClient();
      console.log(data)
      if (id) {
        const { error } = await supabase
          .from("task_management")
          .update({ title: data.name, status: data.status })
          .eq("id", id);
  
        if (error) {
          console.error("Error updating project:", error.message);
          toast.error("Failed to update project.");
        } else {
          toast.success("Task updated successfully!");
        }
      } else if(projectId) {
        const { error } = await supabase
          .from("task_management")
          .insert({ title: data.name, status: data.status, project_id: projectId });
  
        if (error) {
          console.error("Error inserting data:", error.message);
          toast.error("Something went wrong!");
        } else {
          toast.success("Task added successfully!");
        }
      }
      router.push(`/task-management/${projectId}`);
    };

  return (
    <div className="flex min[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {initialData ? "Update Task" : "Add Task"}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Task</label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 w-full rounded-lg border p-2 focus:border-blue-500 focus:ring"
              placeholder="Enter name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              {...register("status")}
              className="mt-1 w-full rounded-lg border p-2 bg-white focus:border-blue-500 focus:ring"
            >
              {statusOptions.map((status) => (
                <option key={status.key} value={status.value}>
                  {status.key}
                </option>
              ))}
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : initialData ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
