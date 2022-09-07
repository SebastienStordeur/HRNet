import React, { useEffect, useState } from "react";
import Employee from "./Employee";

type Employee = {
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
  const [employees, setEmployees] = useState<Employee[] | any>([]);

  const storedEmployees = localStorage.getItem("employees");

  useEffect(() => {
    if (typeof storedEmployees === "string") {
      let localEmployees: Employee | null;
      localEmployees = JSON.parse(storedEmployees);
      setEmployees(localEmployees);
    }
  }, [storedEmployees]);

  return (
    <section id="employee-list" className="max-w-[1110px] mx-auto mt-5 ">
      <div className="grid grid-cols-9 text-white bg-blue h-10 font-medium text-center py-1.5">
        <span>First Name</span>
        <span>Last Name</span>
        <span>Start Date</span>
        <span>Department</span>
        <span>Date of Birth</span>
        <span>Street</span>
        <span>City</span>
        <span>State</span>
        <span>Zip Code</span>
      </div>
      <div>
        {employees.slice(0, 10).map((employee: Employee) => {
          return (
            <Employee key={Math.random().toString()} employee={employee} />
          );
        })}
      </div>
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
