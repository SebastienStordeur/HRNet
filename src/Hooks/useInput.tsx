import React, { useState } from "react";

const useInput = (validateValue: (value: string) => {}) => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler: (
    event: React.FormEvent<HTMLInputElement>
  ) => void = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredValue(event.currentTarget.value);
  };

  const inputBlurHandler: () => void = () => {
    setIsTouched(true);
  };

  const reset: () => void = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
