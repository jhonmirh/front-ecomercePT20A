import { getProductsById } from "@/helpers/product.helper";
import React from "react";
import ProductId from "@/components/ProductId/ProductId";
import DetailProductProps from "./[productId]/types";
import DatailProduct from "./[productId]/page";


const DetailProduct: React.FC<DetailProductProps> = async ({ params }) => {
  const { productId } = params;
  const product = await getProductsById(productId);

  if (!product) {
      return (
          <div>
              <h1>Product Not Found</h1>
          </div>
      );
  }

  return (
      <div>
          <ProductId {...product} />
      </div>
  );
};


export default DatailProduct;
