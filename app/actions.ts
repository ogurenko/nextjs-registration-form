"use server";

import * as z from "zod";

type RegistrationAction = {
  error?: {
    code: "VALIDATION_ERROR";
    fieldErrors: {
      [key: string]: string[];
    };
  };
};

export async function register(
  _previousState: unknown,
  formData: FormData
): Promise<RegistrationAction | void> {
  const registrationSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    registrationSchema.parse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      throw error;
    }
  }
}
