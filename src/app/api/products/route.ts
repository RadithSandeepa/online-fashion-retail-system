import dbConnect from "@/lib/dbconfig";
import { Product } from "@/models/product.model";
import { productSchema } from "@/types/zodSchemas";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: 'You are not logged in!' }, { status: 400 });
        }

        //get all products
        const products = await Product.find();

        if (!products) {
            return NextResponse.json({ error: 'products does not exist!' }, { status: 404 });
        }


        return NextResponse.json({ message: "Lesson fetched successfully", status: 200, data: products });

    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map((err) => err.message).join(", ");
            return NextResponse.json({ message: errorMessage }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}

