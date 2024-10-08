
interface IFileInputProps {
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  disabled: boolean;
}

const FileInput = ({ handleFileChange, disabled }: IFileInputProps) => {
  return (
    <input
      disabled={disabled}
      type="file"
      accept="image/*"
      onChange={(e) => handleFileChange(e)}
    />
  );
};

export default FileInput;
