import React, { useEffect, useState } from "react";
import Employee from "./Employee";

type Employe = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  department: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

const EmployeesList: React.FC = () => {
  const [employees, setEmployees] = useState<Employe[] | any>([]);

  const storedEmployees = localStorage.getItem("employees");

  useEffect(() => {
    if (typeof storedEmployees === "string") {
      let localEmployees: Employe | null;
      localEmployees = JSON.parse(storedEmployees);
      setEmployees(localEmployees);
    }
  }, [storedEmployees]);

  return (
    <section id="employee-list" className="max-w-[1110px] mx-auto mt-5 ">
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-9 text-white w-full bg-blue h-10 font-medium text-center py-1.5">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody className="w-full mt-10">
          {employees.slice(0, 10).map((employee: Employe) => {
            return (
              <Employee key={Math.random().toString()} employee={employee} />
            );
          })}
        </tbody>
      </table>
      <div></div>
      <div className="flex justify-between">
        <p>Showing X of X</p>
        <div>
          <button>Previous</button>
          <span className="mx-4">1</span>
          <button>Next</button>
        </div>
      </div>
    </section>
  );
};

export default EmployeesList;
