import React from "react";
import { Grid, _ } from "gridjs-react";
const data = [
  ["01", "Jonathan", "jonathan", "Senior Implementation Architect"],
  ["02", "Harold", "harold", "Forward Creative Coordinator"],
  ["03", "Shannon", "shannon", "Legacy Functionality Associate"],
  ["04", "Robert", "robert", "Product Accounts Technician"],
  ["05", "Noel", "noel", "Customer Data Director"],
  ["06", "Traci", "traci", "Corporate Identity Director"],
  ["07", "Kerry", "kerry", "Lead Applications Associate"],
  ["08", "Patsy", "patsy", "Dynamic Assurance Director"],
  ["09", "Cathy", "cathy", "Customer Data Director"],
  ["10", "Tyrone", "tyrone", "Senior Response Liaison"],
];

const GridTable = (tabledata) => {
  return (
    <div>
      <Grid
        data={data}
        columns={[
          {
            name: "ID",
            formatter: (cell) => _(<span className="fw-semibold">{cell}</span>),
          },
          "Name",
          {
            name: "Email",
            formatter: (cell) => _(<a href="/#"> {cell} </a>),
          },
          {
            name: "Actions",
            width: "120px",
            formatter: (cell) =>
              _(
                <a href="/#" className="text-reset text-decoration-underline">
                  {" "}
                  Details{" "}
                </a>
              ),
          },
        ]}
        search={true}
        sort={true}
        pagination={{ enabled: true, limit: 20 }}
      />
    </div>
  );
};

export default GridTable;
