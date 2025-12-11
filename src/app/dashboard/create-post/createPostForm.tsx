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
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import useUploadImage from "@/hooks/useUploadImage";
import { Progress } from "@/components/ui/progress";
import { Image } from "@imagekit/next";
import { DEFAULT_IMAGE, DEFAULT_IMAGE_ALT } from "@/lib/canstants";

function CreatePostForm() {
  const [value, setValue] = useState("");
  const {
    fileInputRef: ref,
    handleUpload,
    progress,
    uploadResponse,
  } = useUploadImage();
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  // 1. Define your form.
  const form = useForm<formSchemaType>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      category: undefined,
      image: undefined,
      blog: "",
    },
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    form.reset({
      category: "",
      title: "",
      image: undefined,
    });
    if (ref.current) {
      ref.current.value = "";
    }
  }
  console.log(new Date().toLocaleDateString());
  

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
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
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
        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-2">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Upload image</FormLabel>
                  <FormControl>
                    {/* File input element using React ref */}
                    <Input
                      type="file"
                      accept="image/*"
                      ref={ref}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
          {uploadResponse.$ResponseMetadata?.statusCode === 200 && (
            <Image
              src={uploadResponse.name || DEFAULT_IMAGE}
              alt={uploadResponse.name || DEFAULT_IMAGE_ALT}
              width={uploadResponse.width}
              height={uploadResponse.height}
              className="w-full"
            />
          )}
        </div>
        <FormField
          control={form.control}
          name="blog"
          render={({ field }) => (
            <FormItem className="mb-7">
              <FormControl>
                <ReactQuill
                  {...field}
                  theme="snow"
                  onBlur={field.onChange}
                  defaultValue={field.value}
                  placeholder="Write something..."
                  className="h-72"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CreatePostForm;
