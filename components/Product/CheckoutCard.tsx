import { CartItem } from '@/models/Product'
import Image from 'next/image'
import React from 'react'


function OldCheckoutCard({item,index}:{item:CartItem,index: number}) {
    return (
        <tr>
            <td className="d-flex align-items-center gap-2">
                <Image
                className="rounded-2"
                src={item.product.imageCover}
                alt={item.product.title}
                width={50}
                height={50}
                priority={index < 5}
                loading={index < 5 ? "eager" : "lazy"}
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