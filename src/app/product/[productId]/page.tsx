import React from "react";
import DetailProductProps from "./types";
import { getProductsById } from "@/helpers/product.helper";
import ProductId from "@/components/ProductId/ProductId";

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

  return <ProductId {...product} />;
};

export default DetailProduct;
