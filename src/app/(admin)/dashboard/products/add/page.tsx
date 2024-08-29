"use client";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { productSchema } from '@/types/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Page = (): JSX.Element => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<formData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
        },
    });

    type formData = z.infer<typeof productSchema>;

    const onSubmit = async (values: formData) => {
        try {
            const response = await axios.post("/api/product", values);
            if (response.status >= 200 && response.status < 300) {
                router.push("/dashboard/products");
                toast({
                    description: "Update successful!",
                });
                router.refresh();

            } else {
                toast({
                    variant: "destructive",
                    title: "Update failed",
                    description: "Failed. Please try again.",
                });
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                const errorMessage = data?.error || "An error occurred during inserting";
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: errorMessage,
                });
            } else if (error instanceof z.ZodError) {
                error.errors.forEach(errorItem => {
                    const field = errorItem.path.join('.');
                    form.setError(field as keyof formData, {
                        type: "server",
                        message: errorItem.message,
                    });
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "An unexpected error occurred during inserting",
                });
            }
        }
    };

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Enter Product Details</h1>
                <Button asChild variant='secondary'>
                    <Link href={'/dashboard/products'}>Go Back</Link>
                </Button>
            </div>
            <div className="flex flex-1 rounded-lg border border-dashed shadow-sm">
                <div className='p-8 w-full'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Moose T-shirt" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" /> Please wait...
                                    </>
                                ) : (
                                    "Add Product"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    );
};

export default Page;
