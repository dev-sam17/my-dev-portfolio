"use server";

import { z } from "zod";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

// Define the message schema for validation
const messageSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

// Type for form validation errors
export type FormErrors = {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  phone?: string[];
  message?: string[];
  _form?: string[];
};

// Type for the message form data
export type MessageFormData = z.infer<typeof messageSchema>;

/**
 * Submit a new message from the contact form
 */
export async function submitMessage(
  formData: MessageFormData
): Promise<{ success: boolean; errors?: FormErrors }> {
  try {
    // Validate the form data
    const validatedData = messageSchema.safeParse(formData);

    if (!validatedData.success) {
      // Return validation errors
      const errors: FormErrors = {};
      validatedData.error.errors.forEach((error) => {
        const path = error.path[0] as keyof FormErrors;
        errors[path] = errors[path] || [];
        errors[path]!.push(error.message);
      });
      return { success: false, errors };
    }

    // Create the message in the database
    await prisma.message.create({
      data: validatedData.data,
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/messages");

    return { success: true };
  } catch (error) {
    console.error("Error submitting message:", error);
    return {
      success: false,
      errors: { _form: ["Failed to submit message. Please try again."] },
    };
  }
}

/**
 * Get all messages
 */
export async function getMessages() {
  try {
    return await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { error: "Failed to fetch messages" };
  }
}

/**
 * Get a message by ID
 */
export async function getMessageById(id: string) {
  try {
    return await prisma.message.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error fetching message ${id}:`, error);
    return { error: `Failed to fetch message ${id}` };
  }
}

/**
 * Mark a message as read
 */
export async function markMessageAsRead(id: string) {
  try {
    return await prisma.message.update({
      where: { id },
      data: { read: true },
    });
  } catch (error) {
    console.error(`Error marking message ${id} as read:`, error);
    return { error: `Failed to mark message ${id} as read` };
  }
}

/**
 * Delete a message
 */
export async function deleteMessage(id: string) {
  try {
    const deletedMessage = await prisma.message.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/messages");
    return deletedMessage;
  } catch (error) {
    console.error(`Error deleting message ${id}:`, error);
    return { error: `Failed to delete message ${id}` };
  }
}
