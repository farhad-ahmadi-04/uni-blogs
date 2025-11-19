import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(evt.data);

    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    if (eventType === "user.created" || eventType === "user.updated") {
      const {
        id,
        first_name,
        last_name,
        email_addresses,
        image_url,
        username,
      } = evt.data;

      try {
        const user = await createOrUpdateUser(
          id,
          first_name,
          last_name,
          email_addresses,
          image_url,
          username
        );

        if(user && eventType === 'user.created'){
          try {
            const client = await clerkClient();
            await client.users.updateUserMetadata(id, {
              publicMetadata: {
                userMongoId: user._id,
                isAdmin: user.isAdmin
              }
            });
          } catch (error) {
            console.log('Error updating user metadata:', error);
            
          }
        }
      } catch (error) {
        console.log('Error creating or updating user:', error);
        return new Response("Error occurred", { status: 400 });
      }
    }

if(eventType === "user.deleted"){
  const {id} = evt.data;
  try {
    await deleteUser(id)
  } catch (error) {
    console.log('Error deleting user:', error);
    return new Response('Error occurred', { status: 400 });
  }
}

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
