import React, { ChangeEvent } from 'react'
import './index.css'

export interface FormOption {
  value: string;
  label: string;
  labelPT?: string;
}
interface FormDropdownProps {
  label: string;
  value: string;
  options: FormOption[];
  onChange: (value: string) => void;
  required?: boolean;
}


export default function FormDropdown(props: FormDropdownProps) {

  const {
    label,
    value,
    options,
    onChange,
    required = false
  } = props;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  };

  return (
    <div className="formDropdown">
      <label>{label}</label>
      <select value={value} onChange={handleChange} required={required}>
          <option value=''>
            {label.split(':')[0]}
          </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>

  )
}
