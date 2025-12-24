import { SearchModel } from '@/models/Product';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function OldSearchCard({searchModel}:{searchModel:SearchModel}) {


    return (
        <Link
            href={`/product/${searchModel.product._id}`}
            className="d-flex align-items-center gap-2 text-decoration-none text-dark py-2 border-bottom"
            onClick={() => searchModel.setShow(false)}
            >
            <Image
                src={searchModel.product.imageCover}
                alt={searchModel.product.title}
                width={40}
                height={40}
                className="rounded"
                priority
            />
            <div className="d-flex flex-column">
                <span className="fw-semibold small">{searchModel.product.title}</span>
                <span className="text-muted small">{searchModel.product.price} EGP</span>
            </div>
        </Link>
    )
}

export const SearchCard = React.memo(OldSearchCard);