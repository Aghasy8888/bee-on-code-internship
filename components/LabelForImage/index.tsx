import Image from 'next/image';
import { uploadPhotoIcon } from '@/public/assets';

import styles from './LabelForImage.module.scss';

interface ILabelForImageProps {
  i: number;
  imageFile: File | null;
  universalLabel?: boolean;
}

const LabelForImage = ({
  i,
  imageFile,
  universalLabel,
}: ILabelForImageProps) => {
  return (
    <label
      htmlFor={`fileInput${i}`}
      className={`${styles.uploadPhoto} ${styles.fromAddProduct} ${
        !universalLabel ? styles.littleLabel : ''
      } ${imageFile ? styles.withImgFile : ''}`}
    >
      {imageFile ? (
          <Image
            src={URL.createObjectURL(imageFile)} // Conditional src
            alt="Preview"
            className={styles.image}
            layout="fill"
          />
      ) : (
        <>
          <Image
            alt="uploadPhotoIcon"
            src={uploadPhotoIcon}
            width={universalLabel ? 30 : 22}
            height={universalLabel ? 30 : 22}
          />
          {universalLabel && (
            <p>
              загрузить <br /> фото
            </p>
          )}
        </>
      )}      
    </label>
  );
};

export default LabelForImage;
