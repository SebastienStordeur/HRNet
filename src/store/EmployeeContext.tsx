import React, { useState } from "react";
import { Employe } from "../components/List/EmployeesList";
import data from "../Data/employees.json";

type EmployeeContextProviderProps = {
  children: React.ReactNode;
};

export const EmployeeContext = React.createContext<{
  employees: Employe[];
  addEmployee: (newEmployee: Employe) => void;
}>({
  employees: [],
  addEmployee: () => {},
});

export const EmployeeProvider = ({
  children,
}: EmployeeContextProviderProps) => {
  const [employees, setEmployees] = useState<Employe[]>(data);

  const addEmployee: (newEmployee: Employe) => void = (
    newEmployee: Employe
  ) => {
    setEmployees([...employees, newEmployee]);
  };

  const defaultValue = {
    employees: employees,
    addEmployee: addEmployee,
  };

  return (
    <EmployeeContext.Provider value={defaultValue}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;
