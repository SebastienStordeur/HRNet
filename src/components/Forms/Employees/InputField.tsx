import React from "react";
import Input from "../../UI/Input";
import InputValidator from "../Inputvalidator/InputValidator";
import Label from "./Label";

interface IInputField {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  hasError: boolean;
}

const InputField: React.FC<IInputField> = (props) => {
  return (
    <InputValidator>
      <Label htmlFor={props.id}>
        {props.label}
        <Input id={props.id} type={props.type} value={props.value} onChange={props.onChange} onBlur={props.onBlur} />
      </Label>
      {props.hasError && <p className="text-sm font-bold text-red">Wrong format or empty field</p>}
    </InputValidator>
  );
};

export default InputField;
