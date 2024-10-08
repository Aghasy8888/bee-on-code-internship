import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      changeHandler,
      className,
      placeholder = '',
      inputValue,
      required = false,
      type = 'text',      
    },
    ref
  ) => {
    return (
          <input
            type={type}
            className={className}
            placeholder={placeholder}
            onChange={changeHandler}
            value={inputValue ? inputValue : ''}
            required={required}
            ref={ref}
          />
    );
  }
);

Input.displayName = 'Input';

export default Input;
