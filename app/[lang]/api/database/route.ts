import { connectToDatabase } from "@/components/utils/db";
import { UserModel } from "@/models/User";
import { NextResponse } from "next/server";


export async function GET(request: Request, res: NextResponse) {
    try {
        await connectToDatabase(); // Ensure that we are connected to the database
        const newUser = await UserModel.create({ // Create a new user
            name: 'test',
            password: '1234',
        });
        console.log(newUser);
        return new Response("user created"); // Return a HTTP 201 Created response
    } catch (error) {
        console.error(`Error creating user: ${error}`);

    }

}