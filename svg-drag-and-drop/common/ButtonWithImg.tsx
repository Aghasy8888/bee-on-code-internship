import Image from 'next/image';

interface IButtonWithImgProps {
  className: string;
  alt: string;
  src: string;
  onClick: () => void;
}

const ButtonWithImg = ({
  alt,
  className,
  src,
  onClick,
}: IButtonWithImgProps) => {
  return (
    <button className={className}>
      <Image
        alt={alt}
        src={src}
        onClick={onClick}
        width={15}
        height={15}
        priority
      />
    </button>
  );
};

export default ButtonWithImg;
