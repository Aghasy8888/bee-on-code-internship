'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { uploadImageIcon } from '@/public/assets';
import { applyColorToSvg, applySizesToSvg } from '@/helpers';

interface IUploadImageProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  svgContent: string | null;
  color: string;
  setSvgContent: TSetStringOrNull;
}

const UploadImage = ({
  handleFileChange,
  svgContent,
  setSvgContent,
  color,
}: IUploadImageProps) => {  

  useEffect(() => {
    if (svgContent) {
      const updatedSvg = applyColorToSvg(svgContent, color);
      const sizesNormalizedSvg = applySizesToSvg(updatedSvg, 23, 23);
      setSvgContent(sizesNormalizedSvg); 
    }
  }, [svgContent, color]); 

  return (
    <>
      <label
        htmlFor="fileInput"
        className="relative cursor-pointer w-6 flex items-center"
      >
        {svgContent ? (
          <div
            className="w-full h-full relative object-cover"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <Image
            alt="uploadPhotoIcon"
            src={uploadImageIcon}
            width={20}
            height={20}
          />
        )}
      </label>

      <input
        id="fileInput"
        type="file"
        accept="image/svg+xml"
        onChange={(e) => handleFileChange(e)}
        className="hidden"
      />
    </>
  );
};

export default UploadImage;
