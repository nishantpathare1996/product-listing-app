export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type ExtendedProduct = Product & {
  metaData: string[];
};

export type CardProps = {
  product: Product;
};

export type SortingType = "ascending" | "descending";
