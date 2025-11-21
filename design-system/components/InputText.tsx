import React, { useState } from 'react';
import '../components-css/input.css';

export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
  defaultValue?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  value,
  defaultValue,
  className = '',
  id,
  ...rest
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    const oc = rest.onChange as React.ChangeEventHandler<HTMLInputElement> | undefined;
    if (oc) oc(e);
  };

  const inputId = id || (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div className={`input-wrap ${className}`.trim()}>
      {label ? <label htmlFor={inputId}>{label}</label> : null}
      <input
        id={inputId}
        className={`input`}
        value={isControlled ? value : internalValue}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

export default InputText;
