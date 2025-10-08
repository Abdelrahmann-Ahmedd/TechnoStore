export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;     
    createdAt: string;
    updatedAt: string;
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    _id: string;
    id?: string; 
    title: string;
    slug?: string;
    description: string;
    images: string[];
    imageCover: string;
    quantity?: number;
    sold?: number;
    price: number;
    category: Category;
    subcategory?: Subcategory[];
    brand?: Brand;
    ratingsAverage: number;
    ratingsQuantity?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface SingleProduct {
    brand: Brand;
    category: Category;
    createdAt: string;
    description: string;
    id: string;
    imageCover: string;
    images: string[];
    price: number;
    quantity: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    slug: string;
    sold: number;
    subcategory: Category[];
    title: string;
    updatedAt: string;
    __v: number;
    _id: string;
}

export interface SingleProductResponse {
    data: {
        data : SingleProduct,
    },
    error : null 
}

export interface WishlistItem {
    _id: string;
    product: Product;
    quantity: number;
    addedAt: string;        
}

export interface Wishlist {
    _id: string;
    items: WishlistItem[];
    lastUpdated?: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  count: number;   
  price: number;     
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface PaginatedData<T> {
    results: number;
    data: T[];
    metadata: {
    currentPage: number,
    numberOfPages: number,
    limit: number,
    nextPage: number
  },
}

