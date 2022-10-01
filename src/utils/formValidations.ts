export const letterRegex: RegExp = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

export const numberRegex: RegExp = /^\d+$/;
export const isNotEmpty: any = (value: string) => value.trim() !== "";

export const isValidText: any = (value: string) => letterRegex.test(value) && isNotEmpty && value.length > 2;

export const isValidNumber: any = (value: string) => numberRegex.test(value) && isNotEmpty && value.length === 5;
