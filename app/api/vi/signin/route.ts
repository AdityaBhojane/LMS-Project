import prisma from "@/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { signinSchema } from "@/scheams/UserSchema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { success } = signinSchema.safeParse(body);
    if (!success) {
      return Response.json(
        {
          message: "Invalid Inputs",
        },
        { status: 411 },
      );
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!userExists) {
      return Response.json({
        message: "User Doesn't exists",
      });
    }
    const hashedPassword = await bcrypt.compare(
      body.password,
      userExists.password,
    );
    console.log(hashedPassword);

    if (!hashedPassword) {
      return Response.json(
        {
          message: "Incorrect password",
        },
        { status: 403 },
      );
    }

    const token = jwt.sign(userExists.id, process.env.JWT_SECRET!);
    return Response.json({
      message: "Signin Route",
      token: token,
    });
  } catch (err) {
    console.log("server ki toh maa chud gyi yaar");
    console.log(err);
  }
}
