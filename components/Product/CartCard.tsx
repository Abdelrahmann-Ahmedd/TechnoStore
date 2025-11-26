import { CartItem } from '@/models/Product'
import { useAppDispatch } from '@/store/hooks';
import { deleteItemFromCart, updateUserCart } from '@/store/slices/cartSlice';
import Image from 'next/image';
import React from 'react'
import toast from 'react-hot-toast';

export default function CartCard({item}:{item:CartItem}) {

    const dispatch = useAppDispatch();

    return (
        <div className="row align-items-center mb-4 py-3 border rounded">
            <div className="col-12 col-md-2 text-center mb-3 mb-md-0">
                <Image
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-50 img-fluid rounded"
                loading="lazy"
                width={200}
                height={200}
                />
            </div>

            <div className="col-12 col-md-6">
                <h5>{item.product.title}</h5>
                <p className="mb-1 text-muted">
                {item.product.price} EGP × {item.count}
                </p>
                <p className="mb-1 fw-semibold">Subtotal: {item.price} EGP</p>
            </div>

            <div className="col-12 col-md-3 text-md-end d-flex flex-column align-items-center align-items-md-end gap-2">
                <div className="d-flex align-items-center mb-2">
                <button
                    className="btn btn-outline-danger btn-sm px-3"
                    onClick={() => {
                    if (item.count <= 1) return;
                    dispatch(
                        updateUserCart({
                        id: item.product._id,
                        body: { count: item.count - 1 },
                        })
                    );
                    toast.success(`Decreased quantity of ${item.product.title}`);
                    }}
                    disabled={item.count <= 1}
                >
                    -
                </button>
                <span className="px-2 fs-4">{item.count}</span>
                <button
                    className="btn btn-outline-success btn-sm px-3"
                    onClick={() => {
                    dispatch(
                        updateUserCart({
                        id: item.product._id,
                        body: { count: item.count + 1 },
                        })
                    );
                    toast.success(`Increased quantity of ${item.product.title}`);
                    }}
                >
                    +
                </button>
                </div>

                <button
                className="btn btn-danger"
                onClick={() => {
                    dispatch(deleteItemFromCart(item.product._id));
                    toast.error(`${item.product.title} removed from cart`);
                }}
                >
                🗑 Remove
                </button>
            </div>
        </div>
    )
}
