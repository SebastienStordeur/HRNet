import React, { useState } from "react";
import { departments, states } from "../../../utils/datalist";
import useInput from "../../../Hooks/useInput";
import Modal from "../../Modal/Modal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import InputValidator from "../Inputvalidator/InputValidator";
import Label from "./Label";
import { ListSelect } from "list-select";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { months } from "../../../utils/months";

const letterRegex: RegExp =
  /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const numberRegex: RegExp = /^\d+$/;
const isNotEmpty: any = (value: string) => value.trim() !== "";

const isValidText: any = (value: string) =>
  letterRegex.test(value) && isNotEmpty && value.length > 2;

const isValidNumber: any = (value: string) =>
  numberRegex.test(value) && isNotEmpty && value.length === 5;

const CreateEmployeeForm: React.FC = () => {
  const [startValue, setStartValue] = useState<any>(new Date());
  const [startCalendarIsVisble, setStartCalendarIsVisible] =
    useState<boolean>(false);
  const [birthValue, setBirthValue] = useState<any>(new Date());

  const openStartCalendarHandler = () => {
    setStartCalendarIsVisible(true);
  };

  const formatDate = (value: any) => {
    const unformattedDate: string[] = value.toString().split(" ").splice(1, 3);
    const monthNumber = months.find(
      (month) => month.name === unformattedDate[0]
    );

    if (monthNumber) {
      unformattedDate[0] = monthNumber?.number;
    }

    const formattedDate = unformattedDate.join("/");

    return formattedDate;
  };

  const {
    value: enteredFirstname,
    isValid: enteredFirstnameIsValid,
    hasError: firstnameInputHasError,
    valueChangeHandler: firstnameChangeHandler,
    inputBlurHandler: firstnameBlurHandler,
    reset: resetFirstnameInput,
  } = useInput(isValidText);

  const {
    value: enteredLastname,
    isValid: enteredLastameIsValid,
    hasError: lastnameInputHasError,
    valueChangeHandler: lastnameChangeHandler,
    inputBlurHandler: lastnameBlurHandler,
    reset: resetLastnameInput,
  } = useInput(isValidText);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput(isValidText);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput(isValidText);

  const {
    value: enteredZip,
    isValid: enteredZipIsValid,
    hasError: zipInputHasError,
    valueChangeHandler: zipChangeHandler,
    inputBlurHandler: zipBlurHandler,
    reset: resetZipInput,
  } = useInput(isValidNumber);

  let formIsValid: boolean = false;

  if (
    enteredFirstnameIsValid &&
    enteredLastameIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredZipIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler: (event: React.FormEvent<HTMLFormElement>) => void = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formIsValid) return;

    setShowModal((prevValue) => !prevValue);
    resetFirstnameInput();
    resetLastnameInput();
    resetStreetInput();
    resetCityInput();
    resetZipInput();
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalHandler: () => void = () => {
    setShowModal((prevValue) => !prevValue);
  };

  const handleChange: () => void = () => {};

  return (
    <React.Fragment>
      <form
        className="max-w-[1110px] px-8 mt-20 mx-auto grid grid-cols-2 gap-8"
        onSubmit={submitHandler}
      >
        <div className="bg-blue w-full h-auto p-8">
          <InputValidator>
            <Label htmlFor="firstName">
              FirstName
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={enteredFirstname}
                onChange={firstnameChangeHandler}
                onBlur={firstnameBlurHandler}
              />
            </Label>
            {firstnameInputHasError && (
              <p className="text-sm font-bold text-red">
                Wrong format or empty field
              </p>
            )}
          </InputValidator>
          <InputValidator>
            <Label htmlFor="name">
              Last Name
              <Input
                id="name"
                name="name"
                type="text"
                value={enteredLastname}
                onChange={lastnameChangeHandler}
                onBlur={lastnameBlurHandler}
              />
            </Label>
            {lastnameInputHasError && (
              <p className="text-sm font-bold text-red">
                Wrong format or empty field
              </p>
            )}
          </InputValidator>
          <InputValidator>
            <Label htmlFor="birth">
              Date of birth
              <Input
                id="birth"
                name="birth"
                type="date"
                value=""
                onChange={handleChange}
                onBlur={handleChange}
              />
            </Label>
          </InputValidator>
          <InputValidator>
            <Label htmlFor="startDate">
              Start Date
              <Input
                id="start"
                name="startDate"
                type="input"
                value=""
                onChange={handleChange}
                onBlur={handleChange}
              />
              <Calendar
                onChange={(value: any) => formatDate(value)}
                value={startValue}
              />
            </Label>
          </InputValidator>
        </div>
        <div className="bg-blue w-full h-auto p-8">
          <h2 className="text-white font-bold uppercase text-2xl">Address</h2>
          <InputValidator>
            <Label htmlFor="street">
              Street
              <Input
                id="street"
                name="street"
                type="text"
                value={enteredStreet}
                onChange={streetChangeHandler}
                onBlur={streetBlurHandler}
              />
            </Label>
            {streetInputHasError && (
              <p className="text-sm font-bold text-red">
                Wrong format or empty field
              </p>
            )}
          </InputValidator>
          <InputValidator>
            <Label htmlFor="city">
              City
              <Input
                id="city"
                name="city"
                type="text"
                value={enteredCity}
                onChange={cityChangeHandler}
                onBlur={cityBlurHandler}
              />
            </Label>
            {cityInputHasError && (
              <p className="text-sm font-bold text-red">
                Wrong format or empty field
              </p>
            )}
          </InputValidator>
          <InputValidator>
            <Label htmlFor="state">
              State
              <ListSelect
                data={states}
                headline="State"
                class="bg-white text-blue rounded font-semibold cursor-pointer relative"
                listContainerStyle="absolute w-full left-0 mt-1 rounded-lg z-10 max-h-72 overflow-auto"
                listStyle="bg-white text-blue"
                defaultListStyle="px-4 py-1 w-full h-8 border-solid border-[1px] border-blue hover:bg-blue hover:text-white cursor-pointer"
              />
            </Label>
          </InputValidator>
          <InputValidator>
            <Label htmlFor="zip">
              Zip Code
              <Input
                id="zip"
                name="zip"
                type="number"
                value={enteredZip}
                onChange={zipChangeHandler}
                onBlur={zipBlurHandler}
              />
            </Label>
            {zipInputHasError && (
              <p className="text-sm font-bold text-red">
                Wrong format or empty field
              </p>
            )}
          </InputValidator>
          <InputValidator>
            <Label htmlFor="department">
              Department
              <ListSelect
                data={departments}
                headline="Department"
                class="bg-white text-blue rounded font-semibold cursor-pointer relative"
                listStyle="bg-white text-blue"
                activeValueStyle="bg-blue text-white"
                defaultListStyle="px-4 py-1 w-full h-8 border-solid border-[1px] border-blue hover:bg-blue hover:text-white cursor-pointer"
                listContainerStyle="absolute w-full left-0 mt-1 rounded-lg"
              />
            </Label>
          </InputValidator>
        </div>
        <div className="relative">
          <Button type="submit">Save</Button>
        </div>
      </form>
      {showModal && <Modal onClick={showModalHandler} />}
    </React.Fragment>
  );
};

export default CreateEmployeeForm;
