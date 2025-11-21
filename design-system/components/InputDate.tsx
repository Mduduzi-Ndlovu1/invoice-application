import React, { useState } from 'react';
import '../components-css/date.css';

export interface InputDateProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
  defaultValue?: string;
}

export const InputDate: React.FC<InputDateProps> = ({
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

  const inputId = id || (label ? `date-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div className={`date-wrap ${className}`.trim()}>
      {label ? <label htmlFor={inputId}>{label}</label> : null}
      <input
        id={inputId}
        type="date"
        className={`date`}
        value={isControlled ? value : internalValue}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

export default InputDate;
