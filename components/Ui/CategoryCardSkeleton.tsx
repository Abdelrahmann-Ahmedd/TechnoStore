export function CategorySliderSkeleton() {
    return (
        <div className="container overflow-hidden">
            <div className="row gx-4 justify-content-between">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="col-lg-2 col-md-6 d-flex flex-column justify-content-center align-items-center bg-white p-3 rounded-4">
                        <div className="skeleton skeleton-circle mb-2" />
                        <div className="skeleton skeleton-text small mx-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
}
