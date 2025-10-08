"use client";

import { Provider } from "react-redux";
import { myStore } from "@/store";

export default function ClientStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={myStore}>{children}</Provider>;
}
