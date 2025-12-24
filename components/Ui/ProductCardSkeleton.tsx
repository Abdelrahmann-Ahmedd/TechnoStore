export default function ProductCardSkeleton() {
    return (
        <div className="container gap-3 overflow-hidden">
            <div className="row">
                {Array.from({length: 4}).map((_,i)=>(
                    <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                        <div className="card p-3">
                            <div className="skeleton skeleton-img mb-3" />
                            <div className="skeleton skeleton-text mb-2" />
                            <div className="skeleton skeleton-text small" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

