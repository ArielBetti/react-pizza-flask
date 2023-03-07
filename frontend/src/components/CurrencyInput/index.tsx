import React, { useState, ChangeEvent, useEffect } from "react";
import { Input } from "../";

interface CurrencyInputProps {
  baseValue?: number;
  onChange?: (value: number) => void;
}

function CurrencyInput(props: CurrencyInputProps) {
  const [value, setValue] = useState<string>("");

  const moneyMask = (param: string) => {
    const currency = param.replace(".", "").replace(",", "").replace(/\D/g, "");

    const options = { minimumFractionDigits: 2 };
    const result = new Intl.NumberFormat("pt-BR", options).format(
      parseFloat(currency) / 100
    );

    return "R$ " + result;
  };

  const handleChange = (price: string) => {
    const inputValue = moneyMask(price);

    setValue(inputValue);

    if (props.onChange) {
      props.onChange(
        Number(inputValue.replace(/[^\d,-]/g, "").replace(",", "."))
      );
    }
  };

  useEffect(() => {
    setValue(moneyMask(`${props?.baseValue}`));
  }, [props.baseValue]);

  return (
    <Input
      type="text"
      value={moneyMask(value)}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="R$ 0,00"
    />
  );
}

export default CurrencyInput;
