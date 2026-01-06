import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import { currentUser } from "@clerk/nextjs/server";

/**
 * Creates a new blog post after validating user authorization.
 * 
 * Authenticates the user, validates admin status and user ID match,
 * generates a URL-safe slug from the post title, and persists the post
 * to the database.
 * 
 * @param req - The incoming HTTP request containing post data in JSON format
 * @param req.body.userMongoId - The MongoDB user ID to validate ownership
 * @param req.body.title - The post title (used to generate slug)
 * @param req.body.content - The post content/body text
 * @param req.body.image - Object containing image file name at key "0"
 * @param req.body.category - The post category
 * 
 * @returns Promise<Response> - JSON response with created post object (200) or error message (401/500)
 * 
 * @throws Returns 401 Unauthorized if user is not authenticated, userMongoId doesn't match, or user is not admin
 * @throws Returns 500 Internal Server Error if database operation fails
 */
export const POST = async (req: Request) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();
    console.log("data from server:", data);
    console.log(data.image["0"].name);
    

    if (
      !user ||
      user.publicMetadata.userMongoId !== data.userMongoId ||
      user.publicMetadata.isAdmin !== true
    ) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    const slug = data.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");
    const newPost = await Post.create({
      userId: user.publicMetadata.userMongoId,
      content: data.content,
      title: data.title,
      image: data.image,
      category: data.category,
      slug,
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), {
      status: 200,
    });
  } catch (error) {
    console.log("Error creating post:", error);
    return new Response("Error creating post", {
      status: 500,
    });
  }
};
