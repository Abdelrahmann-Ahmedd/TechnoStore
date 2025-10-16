"use client";

import Image from "next/image";
import notFoundSrc from '../not-found-.webp'

export default function GlobalError() {
  return (
    <section className="error w-100 text-center mt-5">
      <Image className="w-50 m-auto" src={notFoundSrc} alt="not found page logo" width={800} height={450} />
    </section>
  );
}
