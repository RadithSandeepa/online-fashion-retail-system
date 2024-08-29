import { z } from "zod";


const productSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(100, { message: "Name must be at most 100 characters long" }),
});


export { productSchema };