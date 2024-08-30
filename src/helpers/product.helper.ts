import IProduct from "@/interfaces/Products"
import { promises } from "dns"


const APIURL = process.env.NEXT_PUBLIC_API_URL;
if (!APIURL) {
  throw new Error("API base URL is not defined");
}

export async function getProducts(): Promise<IProduct[]> {
    try {
        const res = await fetch(`${APIURL}/products`, {
            next:{revalidate:1200}
        })
        const products: IProduct[] = await res.json();
        return products;
    } catch (error: any) {
        throw new Error(error)
    }
};
export async function getProductsById(id: string): Promise<IProduct | null> {
    try {
        const products: IProduct[] = await getProducts();
        const productFilter = products.find((product) => product.id.toString() === id);
        
        if (!productFilter) return null; // Retorna null si no se encuentra el producto
        
        return productFilter;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null; // Retorna null en caso de error
    }
}