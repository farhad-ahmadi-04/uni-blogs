import User from "../models/user.model";
import { connect } from "@/lib/mongodb/mongoose";

interface emailAddressType 
    {
      created_at: number,
      email_address: string,
      id: string,
      linked_to: Array<unknown>,
      matches_sso_connection: boolean,
      object: string,
      reserved: false,
      updated_at: number,
      verification: object
    }

export const createOrUpdateUser = async (
  id: string,
  first_name?: string | null,
  last_name?: string | null,
  image_Url?: string | null,
  email_addresses?: emailAddressType[],
  username?: string | null
) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_Url,
          email: email_addresses?.[0].email_address,
          username,
        }, 
      },
      { upsert: true, new: true }
    );
    return user;
  } catch (error) {
    console.log("Error creating or updating user:", error);
    
  }
};

export const deleteUser = async (id?: string) => {
try {
  await connect();
  await User.findOneAndDelete({ clerkId: id });
} catch (error) {
  console.log("Error deleting user:", error);
}
}