import React from "react";
import Calendar from "react-calendar";
import Input from "../../UI/Input";
import InputValidator from "../Inputvalidator/InputValidator";
import Label from "./Label";
import "react-calendar/dist/Calendar.css";

interface IDateField {
  id: string;
  readonly: boolean;
  value: any;
  onClick: () => void;
  isVisible: boolean;
  format: (value: string, dataType: string) => void;
}

const DateField: React.FC<IDateField> = (props) => {
  const startValue = new Date();
  return (
    <InputValidator>
      <Label htmlFor="startDate">
        Start Date
        <Input id={props.id} type="text" value={props.value} onClick={props.onClick} readonly />
        {props.isVisible && (
          <div className="mx-auto mt-2">
            <Calendar onChange={(value: any) => props.format(value, props.id)} value={startValue} />
          </div>
        )}
      </Label>
    </InputValidator>
  );
};

export default DateField;
