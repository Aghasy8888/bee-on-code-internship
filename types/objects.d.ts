interface ICategory {
  name: string;
  img: string;
  gender: string;
  subCategories: string[];
}

interface ITextInputProps {
  changeHandler: TInputChangeHandler;
  placeholder?: string;
  inputValue: string | number | undefined;
  error?: null | string;
  required?: boolean;
  type?: string;
  name?: string;
  label?: string;
}

interface IProduct {
  parent: string;
  articleNumber: string;
  price: number;
  images: string;
}

interface ICustomFile extends File {
  lastModifiedDate?: Date | string
}
