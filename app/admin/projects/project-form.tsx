"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X } from "lucide-react";
import type { Project } from "@/lib/types";
import { createProject } from "@/lib/actions/projects";
import { toast } from "@/components/ui/use-toast";
import { upload } from "@vercel/blob/client";
import Image from "next/image";

const projectFormSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z
    .array(z.string().min(1))
    .min(1, "At least one technology is required"),
  images: z
    .array(z.string().url("Invalid URL"))
    .min(1, "At least one image is required"),
  demoUrl: z.string().url("Invalid URL").optional(),
  githubUrl: z.string().url("Invalid URL").optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
      technologies: project?.technologies || [],
      images: project?.images || [],
      demoUrl: project?.demoUrl || "",
      githubUrl: project?.githubUrl || "",
    },
  });

  const technologies = watch("technologies");
  const images = watch("images");
  const [newTech, setNewTech] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const newBlob = await upload(`portfolio/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/admin/api/upload",
      });
      setValue("images", [...images, newBlob.url]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    const result = await createProject(data);
    if ("error" in result) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      router.push("/admin/projects");
    }
  };

  const addTechnology = () => {
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setValue("technologies", [...technologies, newTech.trim()]);
      setNewTech("");
    }
  };

  const removeTechnology = (tech: string) => {
    setValue(
      "technologies",
      technologies.filter((t) => t !== tech)
    );
  };

  const removeImage = async (image: string) => {
    try {
      const response = await fetch("/admin/api/blob/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: image }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      setValue(
        "images",
        images?.filter((img) => img !== image)
      );
    } catch (error) {
      console.error("Error removing image:", error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 mx-5">
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/admin/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {project ? "Edit Project" : "Create New Project"}
          </CardTitle>
          <CardDescription>
            {project
              ? "Update your project information"
              : "Fill in the details for your new project"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter project name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL (Optional)</Label>
                <Input
                  id="demoUrl"
                  type="url"
                  {...register("demoUrl")}
                  placeholder="https://demo.example.com"
                />
                {errors.demoUrl && (
                  <p className="text-sm text-destructive">
                    {errors.demoUrl.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Describe your project"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL (Optional)</Label>
              <Input
                id="githubUrl"
                type="url"
                {...register("githubUrl")}
                placeholder="https://github.com/username/repo"
              />
              {errors.githubUrl && (
                <p className="text-sm text-destructive">
                  {errors.githubUrl.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <Label>Technologies</Label>
              <div className="flex space-x-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add a technology"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTechnology())
                  }
                />
                <Button type="button" onClick={addTechnology} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {errors.technologies && (
                <p className="text-sm text-destructive">
                  {errors.technologies.message}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Project Images</Label>
              <div className="flex space-x-2">
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload Image"}
                </Button>
              </div>
              {errors.images && (
                <p className="text-sm text-destructive">
                  {errors.images.message}
                </p>
              )}
              <div className="space-y-2">
                {images.length > 0 && (
                  <div className="p-2 border rounded">
                    {images.map((image, index) => (
                      <div
                        className="relative items-center gap-2 inline-block ml-5"
                        key={index}
                      >
                        <Image
                          src={image}
                          alt={`Project preview ${index}`}
                          width={160}
                          height={90}
                          className="object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => removeImage(image)}
                          className="absolute top-2 right-2 z-10"
                        >
                          <X className="h-20 w-20" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Processing..."
                  : project
                  ? "Update Project"
                  : "Create Project"}
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/projects">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
