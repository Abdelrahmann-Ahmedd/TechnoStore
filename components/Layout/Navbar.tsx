/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import Link from "next/link"
import Button from "../Ui/Button"
import { useEffect, useState } from "react";
import { logout, setToken } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import SearchView from "@/features/SearchView";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);

  const [mounted, setMounted] = useState(false);
  const [query , setQuery] = useState("");
  useEffect(() => {
    // @ts-expect-error
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    const storedToken = localStorage.getItem("token");
    if (storedToken) dispatch(setToken(storedToken));

    setMounted(true);
  }, [dispatch]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
      <div className="container">
        <h1 className="fs-4 fw-bold m-auto"><Link className="navbar-brand text-primary" href="/">Techno Store</Link></h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/category">Products</Link>
            </li>
            {mounted && (token ? (
              <li className="nav-item">
                <Link className="nav-link" href="/cart">Cart</Link>
              </li>):""
            )}
          </ul>

          <form className=" position-relative me-auto d-flex w-50" role="search">
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="form-control me-2" type="search" placeholder="Search for products..." aria-label="Search" />
            <SearchView query={query}/>
          </form>

          {mounted && (
            token ? (
              <Button
                onClick={() => dispatch(logout())}
                target={false}
                color="danger mainbtn"
                outline={false}
                rounded={2}
              >
                <i className="fa-solid fa-right-from-bracket me-1"></i>
                Logout
              </Button>
            ) : (
              <Button target={false} outline={true} rounded={2} href="/login">
                SignIn
              </Button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
