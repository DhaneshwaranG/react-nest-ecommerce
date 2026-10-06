export interface ProductReview {
  reviewerName: string;
  rating: number;
  comment: string;
  date?: string;
}

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Product {
  id: number;
  public_id?: string;

  title: string;
  description: string;
  category: string;

  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;

  tags?: string[];
  brand?: string;
  sku?: string;

  weight?: number;
  dimensions?: ProductDimensions;

  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;

  reviews?: ProductReview[];

  returnPolicy?: string;
  minimumOrderQuantity?: number;

  meta?: Record<string, unknown>;

  images?: string[];
  thumbnail: string;

  isFeatured?: boolean;

  createdAt?: string;
  updatedAt?: string;
}
