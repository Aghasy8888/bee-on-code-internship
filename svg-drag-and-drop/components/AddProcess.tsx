import Image from 'next/image';
import { addIcon } from '@/public/assets';
import { selectProcesses } from '@/redux/features/generalSlice';
import { useAppSelector } from '@/redux/hooks';
import AddProcessModal, { IAddProcessModalProps } from './AddProcessModal';

interface IAddProcessProps extends IAddProcessModalProps {
  setModalIsOpen: TSetBoolean;
  modalIsOpen: boolean;
}

const AddProcess = ({
  colorState: { color, setColor },
  errorState: { error, setError },
  nameState: { name, setName },
  svgContentState: { setSvgContent, svgContent },
  setModalIsOpen,
  modalIsOpen
}: IAddProcessProps) => {
  const processes = useAppSelector(selectProcesses);

  return (
    <div className={`relative ${!processes[0] ? 'min-h-[112px] w-4' : ''}`}>
      <div
        className={`w-10 flex justify-center absolute bottom-[71px] h-1 mt-2 bg-green-500`}
      >
        <button
          onClick={() => setModalIsOpen(true)}
          className="absolute -bottom-1.5 -right-1"
        >
          <Image alt="addIcon" src={addIcon} width={20} height={20} priority />
        </button>
      </div>
      {modalIsOpen && (
        <AddProcessModal
          errorState={{ error, setError }}
          colorState={{ color, setColor }}
          nameState={{ name, setName }}
          svgContentState={{ setSvgContent, svgContent }}
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </div>
  );
};

export default AddProcess;
