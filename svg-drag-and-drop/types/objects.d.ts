interface ICustomFile extends File {
    lastModifiedDate?: Date | string
  }
  
interface IProcess {
  id: string;
  name: string;
  svg: string;
  color: string;
}

interface IInputProps {
  changeHandler: TInputChangeHandler;
  placeholder?: string;
  inputValue: string | number | undefined;
  required?: boolean;
  type?: string;
  className?: string;
}