import React, { useState } from 'react';
import '../components-css/select.css';

export interface Option {
  value: string;
  label: string;
}

export interface InputSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  value?: string;
  defaultValue?: string;
}

export const InputSelect: React.FC<InputSelectProps> = ({
  label,
  options,
  value,
  defaultValue,
  className = '',
  id,
  ...rest
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    const oc = rest.onChange as React.ChangeEventHandler<HTMLSelectElement> | undefined;
    if (oc) oc(e);
  };

  const selectId = id || (label ? `select-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div className={`select-wrap ${className}`.trim()}>
      {label ? <label htmlFor={selectId}>{label}</label> : null}
      <select
        id={selectId}
        className={`select`}
        value={isControlled ? value : internalValue}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
