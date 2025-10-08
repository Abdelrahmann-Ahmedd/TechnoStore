/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import Link from "next/link";
import Button from "../Ui/Button";
import { useEffect, useState } from "react";
import { logout, setToken } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import SearchView from "@/features/SearchView";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);

  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // @ts-expect-error
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    const storedToken = localStorage.getItem("token");
    if (storedToken) dispatch(setToken(storedToken));
    setMounted(true);
  }, [dispatch]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm w-100">
      <div className="container py-2">
        {/* Logo */}
        <Link href="/" className="navbar-brand fw-bold text-primary fs-4">
          Techno Store
        </Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/category">Products</Link>
            </li>
            {mounted && token && (
              <li className="nav-item">
                <Link className="nav-link" href="/cart">Cart</Link>
              </li>
            )}
          </ul>

          {/* Search Bar */}
          <form
            className="position-relative d-flex flex-grow-1 flex-lg-grow-0 mx-lg-3 mb-3 mb-lg-0"
            role="search"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control"
              type="search"
              placeholder="Search for products..."
              aria-label="Search"
            />
            <SearchView query={query} />
          </form>

          {/* Auth Buttons */}
          <div className="d-flex justify-content-lg-end justify-content-center">
            {mounted && (
              token ? (
                <Button
                  onClick={() => dispatch(logout())}
                  target={false}
                  color="danger mainbtn"
                  outline={false}
                  rounded={2}
                  className="ms-lg-2 w-100 w-lg-auto"
                >
                  <i className="fa-solid fa-right-from-bracket me-1"></i>
                  Logout
                </Button>
              ) : (
                <Button
                  target={false}
                  outline={true}
                  rounded={2}
                  href="/login"
                  className="ms-lg-2 w-100 w-lg-auto"
                >
                  Sign In
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
