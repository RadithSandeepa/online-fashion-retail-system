"use client";
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { set } from 'mongoose';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


interface Product {
  _id: string;
  name: string;
}

export default function Page() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    if (hasFetched) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products`);
        const products = response.data.data;
        setProducts(products);
        setHasFetched(true);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error fetching subject data",
          description: "Could not fetch products data. Please try again.",
        });
      } finally {
        setLoading(false);
        setHasFetched(true);
      }
    };

    fetchData();
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
        <Button asChild variant='link'>
          <Link href={'/dashboard/products/add'}>Add a Product</Link>
        </Button>
      </div>
      <div className="flex flex-1 rounded-lg border border-dashed shadow-sm">
        <div className='p-8 w-full'>
          {loading && (<Loader2 className='animate-spin' />)}
          {
            products.length === 0 ? (
              <p>create a Product first</p>
            ) :
              <div className="grid gap-8 sm:grid-cols-1 md:mt-0 lg:grid-cols-3">
                {
                  products.map((product: Product) => (
                    <Card key={product._id} className='p-8 hover:border-primary hover:bg-secondary'>
                      <CardTitle>
                        <Link href={`/dashboard/products/${product._id}`}>
                          {product.name}
                        </Link>
                      </CardTitle>
                    </Card>
                  ))
                }
              </div>
          }
        </div>
      </div>
    </main>
  );
}