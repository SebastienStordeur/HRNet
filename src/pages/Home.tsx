import React from "react";
import CreateEmployeeForm from "../components/Forms/Employees/CreateEmployeeForm";
import Main from "../components/Layout/Main";

const Home: React.FC = () => {
  return (
    <Main>
      <CreateEmployeeForm />
    </Main>
  );
};

export default Home;
