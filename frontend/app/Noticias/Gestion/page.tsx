import NewsManagment from "@/app/components/NewsManagment";
import React from "react";

const TABLE_HEAD: string[] = ["Name", "Job", "Employed", ""];

interface TableRow {
  name: string;
  job: string;
  date: string;
}

const TABLE_ROWS: TableRow[] = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

export default function DefaultTable() {
    return (

        <div className="relative overflow-x-auto mt-[80px]">
            <NewsManagment/>
        </div>

        
      );
}
