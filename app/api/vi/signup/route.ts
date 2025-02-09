import prisma from "@/db";
import { signupSchema } from "@/scheams/UserSchema";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);
  const { success } = signupSchema.safeParse(body);

  console.log(success);
  if (!success) {
    return Response.json(
      {
        message: "incorrect Inputs",
      },
      { status: 411 },
    );
  }

  const { firstName, lastName, email, username, password } = body;
  console.log(firstName, lastName, email, username, password);

  try {
    console.log("inside try catch");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    const userInserted = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    console.log("user", userInserted);
    if (!userInserted) {
      return Response.json(
        {
          message: "Cannot insert user",
        },
        { status: 403 },
      );
    }
    return Response.json(
      {
        message: "signup Sucesfull",
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) console.log("Error", error.stack);
    return Response.json({
      message: "Server gaya oye",
    });
  }
}
