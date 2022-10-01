import { ListSelect } from "list-select";
import React from "react";
import InputValidator from "../Inputvalidator/InputValidator";
import Label from "./Label";

interface ListField {
  label: string;
  inputId: string;
  id: string;
  hasError: boolean;
  data: string[];
}

const FieldList: React.FC<ListField> = (props) => {
  return (
    <InputValidator id="department">
      <Label htmlFor={props.id}>
        {props.label}
        <ListSelect
          id={props.id}
          data={props.data}
          headline={props.label}
          class="bg-white text-blue rounded font-semibold cursor-pointer relative"
          listStyle="bg-white text-blue"
          activeValueStyle="bg-blue text-white"
          defaultListStyle="px-4 py-1 w-full h-8 border-solid border-[1px] border-blue hover:bg-blue hover:text-white cursor-pointer"
          listContainerStyle="absolute w-full left-0 mt-1 z-10 rounded-lg"
        />
      </Label>
      {props.hasError && <p className="text-sm font-bold text-red">Please choose an option</p>}
    </InputValidator>
  );
};

export default FieldList;
