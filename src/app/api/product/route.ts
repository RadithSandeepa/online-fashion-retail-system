import dbConnect from "@/lib/dbconfig";
import { Product } from "@/models/product.model";
import { productSchema } from "@/types/zodSchemas";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


export async function GET() {
    await dbConnect();
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: 'You are not logged in!' }, { status: 400 });
        }

        const product = await Product.find({ userId: userId });

        if (!product) {
            return NextResponse.json({ error: 'Product does not exist!' }, { status: 404 });
        }

        return NextResponse.json({ message: "Product fetched successfully", status: 200, data: product });

    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map((err) => err.message).join(", ");
            return NextResponse.json({ message: errorMessage }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: 'You are not logged in!' }, { status: 400 });
        }

        const body = await req.json();

        productSchema.parse(body);
        const { name } = body;

        const product = await Product .create({
            name
        });

        if (!product) {
            return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
        }

        return NextResponse.json({ message: "Product created successfully", status: 201 });

    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map((err) => err.message).join(", ");
            return NextResponse.json({ message: errorMessage }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: 'You are not logged in!' }, { status: 400 });
        }

        const body = await req.json();
        productSchema.parse(body);

        const { _id, name } = body;

        const product = await Product.findById(_id);

        if (!product) {
            return NextResponse.json({ error: 'Product does not exist!' }, { status: 404 });
        }


        product.name = name;

        const updatedProduct = await product.save();

        if (!updatedProduct) {
            return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
        }

        return NextResponse.json({ message: "Product updated successfully", status: 200, data: updatedProduct });

    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map((err) => err.message).join(", ");
            return NextResponse.json({ message: errorMessage }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: 'You are not logged in!' }, { status: 400 });
        }

        const body = await req.json();
        const { _id } = body;

        const product = await Product.findById(_id);

        if (!product) {
            return NextResponse.json({ error: 'Product does not exist!' }, { status: 404 });
        }

        await Product.findOneAndDelete({ _id: _id });

        return NextResponse.json({ message: 'Product deleted successfully', status: 200 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessage = error.errors.map((err) => err.message).join(", ");
            return NextResponse.json({ message: errorMessage }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    }
}
