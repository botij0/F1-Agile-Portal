"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { paginate } from "../utils/paginate";
import Pagination from "./Pagination";
import { getRequest } from "../(utils)/api";

export const GestionPilotos = () => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pilotos, setPilotos] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const paginateUsuarios = paginate(pilotos, currentPage, pageSize);

  useEffect(() => {
    const getPilotos = async () => {
      setLoading(true);
      try {
        const response = await getRequest("pilotos");
        const data = await response.data;
        setPilotos(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getPilotos();
    console.log(pilotos);
  }, []);

  return <div>{!loading}</div>;
};
