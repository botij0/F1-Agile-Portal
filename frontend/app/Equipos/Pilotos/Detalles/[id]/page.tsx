"use client";

import DetallesPiloto from "@/app/components/Pilotos/DetallesPiloto";
import { useParams } from "next/navigation";

export default function page() {
  const { id } = useParams();
  const validId = typeof id === "string" ? id : undefined;
  return (
    <div className="relative overflow-x-auto mt-[80px]">
      <DetallesPiloto />
    </div>
  );
}
