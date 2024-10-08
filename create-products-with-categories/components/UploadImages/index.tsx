import Image from 'next/image';
import { FileInput } from '@/common';
import { findFirstNullIndex } from '@/helpers';
import { LabelForImage } from '@/components';
import { XIcon } from '@/public/assets';

import styles from './UploadImages.module.scss';

interface IUploadImagesProps {
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    i?: number
  ) => void;
  imageFiles: (File | null)[];
  imageFileError: string | null;
  onDeleteFile: (i?: number) => void;
}

const UploadImages = ({
  handleFileChange,
  imageFiles,
  imageFileError,
  onDeleteFile
}: IUploadImagesProps) => {
  const firstNullIndex = findFirstNullIndex(imageFiles);

  return (
    <div className={styles.uploadImages}>
      <LabelForImage
        i={firstNullIndex}
        imageFile={null}
        universalLabel
      />

      <div className={styles.imagesCtn}>
        {imageFiles?.map((imageFile, i) => (
          <div className={styles.fileInputCtn} key={i}>
            <LabelForImage
              i={i}
              imageFile={imageFile}
            />

            <FileInput
              disabled={firstNullIndex === -1}
              i={i}
              handleFileChange={handleFileChange}
            />

            {imageFile && (
              <button onClick={() => onDeleteFile(i)} type="button" className={styles.xResetImage}>
                <Image src={XIcon} alt="xIcon" width={5.3} height={5.3} />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className={styles.error}>{imageFileError}</div>
    </div>
  );
};

export default UploadImages;
