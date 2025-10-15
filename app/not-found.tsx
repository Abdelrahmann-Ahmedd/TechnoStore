"use client";

import Image from "next/image";
import notFoundSrc from '../not-found-.webp'

export default function GlobalError() {
  return (
    <section className="w-100 text-center">
      <Image src={notFoundSrc} alt="not found page logo" width={800} height={500} />
    </section>
  );
}
