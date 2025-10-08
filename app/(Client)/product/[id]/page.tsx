"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Carousel from "@/components/Ui/Carousel";
import { SingleProduct } from "@/models/Product";
import ProtectedRoute from "@/features/ProtectedRoute";
import { ProductServices } from "@/services/ProductServices";
import { addProductToCart } from "@/store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";
import LoadingPage  from '@/components/Layout/LoadingPage';

const productCache: Record<string, SingleProduct> = {};

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<SingleProduct | null>(null);
  const [loadingg, setLoading] = useState(true);
  const { loading } = useAppSelector((state) => state.cart);

  const handleAdd = () => {
    if (!product) return;
    dispatch(addProductToCart({ productId: product._id }));
    toast.success(`${product.title} added to cart`);
  };

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      if (productCache[id]) {
        setProduct(productCache[id]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await ProductServices.getProductById(id);
        if (response.error) {
          setProduct(null);
        } else if (response.data) {
          setProduct(response.data.data);
          productCache[id] = response.data.data;
        }
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loadingg) return <LoadingPage />;
  if (!product) return <div className="text-center p-5">Product not found</div>;

  return (
    <ProtectedRoute>
      <div className="container my-5">
        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <div style={{ maxWidth: "500px", width: "100%" }}>
              {product.images?.length > 0 ? (
                <Carousel images={product.images} />
              ) : (
                /* eslint-disable @next/next/no-img-element */
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-100 img-fluid rounded-3"
                  style={{ height: "350px", objectFit: "cover" }}
                />
              )}
            </div>
          </div>

          <div className="col-12 col-lg-6 m-auto">
            <h2 className="fw-bold">{product.title}</h2>
            <h6 className="text-muted">{product.category?.name}</h6>
            <h6 className="text-muted">Brand: {product.brand?.name}</h6>

            <p className="mt-3">{product.description}</p>

            <h4 className="text-primary my-3">{product.price} EGP</h4>
            <p className="text-secondary">
              Sold: {product.sold>1000000?0:product.sold} | Ratings: {product.ratingsQuantity} (
              {product.ratingsAverage})
              <i className="fa-solid fa-star text-warning fa-3xs"> </i>
            </p>

            <button
              onClick={handleAdd}
              className="btn btn-primary btn-lg rounded-3"
            >
              <i className="fa-solid fa-cart-plus me-2"></i>{" "}
              {loading ? "Adding..." : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
