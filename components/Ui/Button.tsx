"use client"
import Link from 'next/link';
import React from 'react'

type ButtonProps = {
    href?: string;
    color?: string;
    onClick?: ()=> void;
    children: React.ReactNode;
    rounded: number;
    outline: boolean;
    target: boolean
};

export function Button({href,color = "primary",onClick,children,rounded,outline,target}: ButtonProps) {

    if (href) {
    return <Link target={target?"_blank":""} onClick={onClick} rel="noopener noreferrer" href={href} className={`btn btn-${color}`}>{children}</Link>;
    }
    return <button  type='button' className={`d-block m-auto w-75 btn btn${outline?"-outline":""}-${color} rounded-${rounded} `} onClick={onClick}>{children}</button>;
}

const MemoButton = React.memo(Button);

export default MemoButton;
