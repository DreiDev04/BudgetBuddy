import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;

  try {
    await dbConnect(); // Connect to the database

    switch (eventType) {
      case "user.created":
        console.log("User Created:", id);
        const existingUser = await User.findOne({ userId: id });
        if (!existingUser) {
          const newUser = new User({
            userId: id,
            email: evt.data.email_addresses?.[0]?.email_address || "",
            firstName: evt.data.first_name || "",
            lastName: evt.data.last_name || "",
            username: evt.data.username || `user_${id}`,
            isOnboardingCompleted: false,
            createdAt: evt.data.created_at,
            updatedAt: evt.data.updated_at,
          });
          // const userBudget = await newUser.createBudget();
          await newUser.save();
        }
        break;

      case "user.updated":
        console.log("User Updated:", id);
        const updatedUser = await User.findOneAndUpdate(
          { userId: id },
          {
            email: evt.data.email_addresses?.[0]?.email_address || "",
            firstName: evt.data.first_name || "",
            lastName: evt.data.last_name || "",
            username: evt.data.username || `user_${id}`, // Fallback for username
            updatedAt: evt.data.updated_at,
          },
          { new: true } // Return the updated document
        );
        if (!updatedUser) {
          console.error("Error: User not found for update");
          return new Response("Error: User not found for update", { status: 404 });
        }
        break;

      case "user.deleted":
        console.log("User Deleted:", id);
        const deletedUser = await User.findOneAndDelete({ userId: id });
        if (!deletedUser) {
          console.error("Error: User not found for deletion");
          return new Response("Error: User not found for deletion", { status: 404 });
        }
        break;

      default:
        console.warn(`Unhandled event type: ${eventType}`);
        break;
    }
  } catch (err) {
    console.error("Error handling webhook event:", err);
    return new Response("Error processing webhook event", { status: 500 });
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
