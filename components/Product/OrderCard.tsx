import { AllOrders, Order } from '@/models/Order'
import Image from 'next/image'

export default function OrderCard({order}: {order:Order | AllOrders}) {


    return (
        <div
        className="p-3 rounded-3 shadow-sm border bg-white"
        >
        <div className="row align-items-center g-3">
            {/* Order ID */}
            <div className="col-12 col-md-3">
            <h6 className="mb-1 text-muted small">Order ID</h6>
            <div className="fw-semibold text-break">{order._id}</div>
            </div>

            {/* Products */}
            <div className="col-12 col-md-4">
            <h6 className="mb-1 text-muted small">Products</h6>
            <ul className="list-unstyled mb-0">
                {order.cartItems?.map((item) => (
                <li
                    key={item.product._id}
                    className="d-flex align-items-center gap-2 mb-2"
                >
                    <Image
                    loading="lazy"
                    width={200}
                    height={200}
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="rounded-2 w-50"
                    />
                    <div className="flex-grow-1 text-truncate">
                    <div
                        className="fw-semibold small text-truncate"
                        title={item.product.title}
                    >
                        {item.product.title}
                    </div>
                    <div className="text-muted small">× {item.count}</div>
                    </div>
                </li>
                ))}
            </ul>
            </div>

            {/* Total Price */}
            <div className="col-6 col-md-2 text-center text-md-start">
            <h6 className="mb-1 text-muted small">Total</h6>
            <div className="fw-semibold">{order.totalOrderPrice} EGP</div>
            </div>

            {/* Status */}
            <div className="col-6 col-md-1 text-center text-md-start">
            <h6 className="mb-1 text-muted small">Status</h6>
            <span
                className={`badge ${
                order.isPaid ? "bg-success" : "bg-warning text-dark"
                } px-3 py-2 rounded-pill`}
            >
                {order.isPaid ? "Paid" : "Pending"}
            </span>
            </div>

            {/* Date */}
            <div className="col-12 col-md-2 text-md-end text-muted small">
            <h6 className="mb-1 text-muted small">Date</h6>
            {order.createdAt.split("T")[0]}
            </div>
        </div>
        </div>
    )
}
