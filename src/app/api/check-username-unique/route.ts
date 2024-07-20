import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

// make query schema - jo kuch bhi check karna hai uska syntax hota hai
const UsernameQuerySchema = z.object({
    username: usernameValidation,
  });

export async function GET(request: Request) {
  await dbConnect();

  try {
    // localhost:3000/api/{whole api}?username=ashu?phone=android
    // many query but we want query of username
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get('username'),
    };

    // username hai ab usko valid check karna hai by using zod
    const result = UsernameQuerySchema.safeParse(queryParams);
    console.log("in check username validate: ", result);
    // result me sucess , error many things but we want data
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(",")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const {username} = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 200 }
      );
    }

    return Response.json(
        {
          success: true,
          message: "Username is unique",
        },
        { status: 200 }
      );
  } catch (error) {
    console.log("Error checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
