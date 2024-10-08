import Image from 'next/image';
import { uploadPhotoIcon } from '@/public/assets';

import styles from './UploadImage.module.scss';

interface IUploadImageProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageFile: File | null;
  imageFileError: string | null;
}

const UploadImage = ({
  handleFileChange,
  imageFile,
  imageFileError,
}: IUploadImageProps) => {

  return (
    <>
          <label
            htmlFor="fileInput"
            className={`${styles.uploadPhoto} ${
              imageFile ? styles.withImgFile : ''
            }`}
          >
            {imageFile ? (
              <Image
                src={URL.createObjectURL(imageFile as File)} // Conditional src
                alt="Preview"
                className={styles.image}
                layout="fill"
              />
            ) : (
              <>
                <Image
                  alt="uploadPhotoIcon"
                  src={uploadPhotoIcon}
                  width={30}
                  height={30}
                />
                <p>
                  загрузить <br /> фото
                </p>
              </>
            )}
            <div className={styles.error}>{imageFileError}</div>
          </label>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e)}
            className={styles.fileInput} // Add hidden class for styling
          />
    </>
  );
};

export default UploadImage;
