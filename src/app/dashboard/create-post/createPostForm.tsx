"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { category, formSchema, formSchemaType } from "./createPostFormSchema";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import useUploadImage from "@/hooks/useUploadImage";
import { Image } from "@imagekit/next";
import { DEFAULT_IMAGE, DEFAULT_IMAGE_ALT } from "@/lib/canstants";
import { JSX, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

/**
 * CreatePostForm component - A form for creating and publishing new blog posts
 *
 * This component provides a comprehensive form interface for users to create blog posts with:
 * - Post title input
 * - Category selection dropdown
 * - Image upload with progress tracking
 * - Rich text editor for blog content using ReactQuill
 *
 * @component
 * @returns {JSX.Element} A form component with title, category, image upload, and blog content fields
 *
 * @remarks
 * - Integrates with react-hook-form for form state management and validation (Zod schema)
 * - Uses Clerk's useUser hook to retrieve user authentication metadata
 * - Leverages custom useUploadImage hook for handling image uploads and progress tracking
 * - Performs form validation before submission
 * - Sends form data to `/api/post/create` endpoint with user metadata
 * - Redirects to the created post page on successful submission
 * - Displays error messages for upload and submission failures
 *
 * @example
 * <CreatePostForm />
 */
function CreatePostForm(): JSX.Element {
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useUser();
  const [publishError, setPublishError] = useState<string | null>(null);
  const {
    fileInputRef: ref,
    handleUpload,
    progress,
    uploadResponse,
  } = useUploadImage();
  // 1. Define your form.
  const form = useForm<formSchemaType>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      category: "category",
      image: undefined,
      content: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    if (!uploadResponse.url) {
      form.setError("image", {
        message: "Please upload an image before submitting the form.",
      });
      return;
    }

    // This will be type-safe and validated.
    try {
      console.log(values);
      setPostLoading(true);
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          image: values.image["0"].name,
          userMongoId: user?.publicMetadata.userMongoId,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setPostLoading(false);
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        setPostLoading(false);
        router.push(`/post/${data.slug}`);
      }
    } catch (error) {
      setPostLoading(false);
      setPublishError("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-8 flex-col w-full md:w-10/12 lg:w-8/12"
      >
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="h-full w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Title"
                    id="title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full md:w-[180px]">
                <FormLabel>category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="category">
                          select category
                        </SelectItem>
                        {category.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Upload image</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <div className="flex items-end gap-2">
                    {/* File input element using React ref */}
                    <Input
                      type="file"
                      accept="image/*"
                      ref={ref}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                      }}
                    />
                    {/* Button to trigger the upload process */}
                    <Button type="button" onClick={handleUpload}>
                      Upload file
                    </Button>
                  </div>
                  {/* Display the current upload progress */}
                  <progress
                    className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full text-red-300"
                    value={progress}
                    max={100}
                  ></progress>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {uploadResponse.$ResponseMetadata?.statusCode === 200 && (
          <Image
            src={uploadResponse.name || DEFAULT_IMAGE}
            alt={uploadResponse.name || DEFAULT_IMAGE_ALT}
            width={uploadResponse.width}
            height={uploadResponse.height}
            className="w-full"
          />
        )}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="mb-7">
              <FormControl>
                <ReactQuill
                  {...field}
                  theme="snow"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  value={field.value}
                  placeholder="Write something..."
                  className="h-72"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={postLoading}>
          {postLoading ? "Publishing..." : "Publish Post"}
        </Button>
      </form>
    </Form>
  );
}

export default CreatePostForm;
