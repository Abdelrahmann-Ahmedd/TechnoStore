import { CartItem } from '@/models/Product'
import Image from 'next/image'
import React from 'react'


function OldCheckoutCard({item}:{item:CartItem}) {
    return (
        <tr>
            <td className="d-flex align-items-center gap-2">
                <Image
                className="rounded-2"
                src={item.product.imageCover}
                alt={item.product.title}
                width={50}
                height={50}
                loading = "lazy"
                />
                <span>{item.product.title}</span>
            </td>
            <td>{item.count}</td>
            <td>{item.price} EGP</td>
            <td>{item.count * item.price} EGP</td>
        </tr>
    )
}

export const CheckoutCard = React.memo(OldCheckoutCard);