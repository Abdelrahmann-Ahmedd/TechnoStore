"use client";

import { AppDispatch, RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/store/slices/authSlice";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { token } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    useEffect(() => {
    if (!mounted) return;
    const savedToken = localStorage.getItem("token");

        if (!token && !savedToken) {
            router.push("/login");
        } else if (!token && savedToken) {
            dispatch(setToken(savedToken));
        }
    }, [mounted, token, dispatch, router]);

    if (!mounted || (!token && !localStorage.getItem("token"))) return null;

    return <>{children}</>;
}
