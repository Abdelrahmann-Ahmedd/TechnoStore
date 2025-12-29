"use client";

export default function ProductCardSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="row g-3">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="col-xl-3 col-lg-4 col-md-6">
            <div className="card position-relative p-3" style={{ width: "18rem" }}>
                
                {/* Image */}
                <div className="skeleton skeleton-img mb-3" />

                {/* Body */}
                <div className="card-body text-center">
                <div className="skeleton skeleton-text mb-2" />
                <div className="skeleton skeleton-text small mb-2" />
                <div className="skeleton skeleton-price mx-auto" />
                </div>

                {/* Heart icon */}
                <div className="skeleton skeleton-heart position-absolute" />

                {/* Button */}
                <div className="skeleton skeleton-btn mt-2" />
            </div>
            </div>
        ))}
        </div>
    );
}
