import { forwardRef } from 'react';
import styles from './TextInputStyles.module.scss';

const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  (
    {
      changeHandler,
      placeholder = '',
      inputValue,
      error = null,
      required = false,
      type = 'text',
      name = 'name',
      label = '',
    },
    ref
  ) => {
    return (
      <div>
        {label && (
          <label htmlFor={name} className={`${styles[`${name}Label`]}`}>
            {label}
          </label>
        )}
        <div className={styles.inputCtn}>
          <input
            type={type}
            placeholder={placeholder}
            onChange={changeHandler}
            value={inputValue ? inputValue : ''}
            className={styles.nameInput}
            required={required}
            ref={ref}
          />

          <div className={styles.error}>{error}</div>
        </div>
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
