import styles from './FileInput.module.scss';

interface IFileInputProps {
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    i?: number
  ) => void;
  i: number;
  disabled: boolean;
}

const FileInput = ({ handleFileChange, i, disabled }: IFileInputProps) => {
  return (
    <input
      disabled={disabled}
      id={`fileInput${i}`}
      type="file"
      accept="image/*"
      onChange={(e) => handleFileChange(e, i)}
      className={styles.fileInput}
    />
  );
};

export default FileInput;
