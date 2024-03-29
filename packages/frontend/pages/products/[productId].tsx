import { Fragment } from "react";
import { GetServerSideProps, NextPage } from "next";
import { IProduct } from "@lucy/interfaces";

import { GoBackButton } from "../../components";
import { PageHeader } from "../../containers";
import { ProductDetails } from "../../containers";
import { ProductService } from "../../services";

type ProductDetailsPageParams = {
  productId: string;
};

type ProductDetailsPageProps = {
  product: IProduct;
};

const ProductDetailsPage: NextPage<ProductDetailsPageProps> = ({ product }) => (
  <Fragment>
    <PageHeader>
      <GoBackButton href="/products?page=1" text="Back to all dresses" />
    </PageHeader>
    <ProductDetails product={product} />
  </Fragment>
);

export const getServerSideProps: GetServerSideProps<
  ProductDetailsPageProps,
  ProductDetailsPageParams
> = async ({ params, res }) => {
  // Parse product id param
  const productId = parseInt(`${params.productId}`, 10);

  // Invalid product id, redirect
  if (isNaN(productId)) {
    res.writeHead(301, "Invalid product id", { Location: "/products?page=1" }).end();
    return { props: { product: null } };
  }

  // Fetch product
  const productService = new ProductService();
  const product = await productService.getProduct(productId);

  // Product not found, refirect
  if (product.id === undefined) {
    res.writeHead(301, "Product not found", { Location: "/products?page=1" }).end();
    return { props: { product: null } };
  }

  return { props: { product } };
};

export default ProductDetailsPage;
