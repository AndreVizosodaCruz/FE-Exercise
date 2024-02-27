import React, { ChangeEvent } from 'react'
import './index.css'

interface FormInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
}

export default function FormInput(props: FormInputProps) {

  const {
    label,
    value,
    onChange,
    type = "text",
    placeholder = '',
    required = false,
    error = false
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  return (
    <div className="formInput">
      {label &&
        <label>{label}</label>
      }
      <input
        className={(error && value?.length > 0) ? 'errorInput' : ''}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}
