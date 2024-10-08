'use client';

import { FormEvent, useRef } from 'react';
import { Input } from '@/common';
import UploadImage from './UploadImage';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  editProcess,
  selectProcesses,
  setItems,
} from '@/redux/features/generalSlice';
import { NAME_ERROR, NAME_EXISTS, PROCESSES, SVG_ERROR } from '@/constants';
import { idGenerator, nameExists } from '@/helpers';
import useFocusRef from '@/hooks/useFocusRef';
import useSetInitialValuesForEdit from '@/hooks/useSetInitialValuesForEdit';

interface INameState {
  name: string;
  setName: TSetString;
}

interface ISvgContentState {
  svgContent: string | null;
  setSvgContent: TSetStringOrNull;
}

interface IColorState {
  color: string;
  setColor: TSetString;
}

interface IErrorState {
  error: string | null;
  setError: TSetStringOrNull;
}

export interface IAddProcessModalProps {
  setModalIsOpen: TSetBoolean;
  nameState: INameState;
  svgContentState: ISvgContentState;
  colorState: IColorState;
  errorState: IErrorState;
  editMode?: boolean;
  process?: IProcess;
  i?: number;
}

const AddProcessModal = ({
  setModalIsOpen,
  colorState: { color, setColor },
  nameState: { name, setName },
  svgContentState: { setSvgContent, svgContent },
  errorState: { error, setError },
  editMode,
  process,
  i,
}: IAddProcessModalProps) => {
  const dispatch = useAppDispatch();
  const processes = useAppSelector(selectProcesses);
  const nameInputRef = useRef<HTMLInputElement>(null);
  useFocusRef(nameInputRef, [String(svgContent), color]);
  useSetInitialValuesForEdit(
    process,
    setColor,
    setName,
    setSvgContent,
    setError
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newImageFile = event.target.files?.[0];

    if (newImageFile && newImageFile.type === 'image/svg+xml') {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const svgText = e.target?.result as string;
        setSvgContent(svgText);
      };
      fileReader.readAsText(newImageFile);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameAlreadyExists = nameExists(processes, name);

    if (!svgContent) {
      setError(SVG_ERROR);
    } else if (!name) {
      setError(NAME_ERROR);
    } else if (nameAlreadyExists && !editMode) {
      setError(NAME_EXISTS);
    } else {
      setError(null);
    }

    if (!name || !svgContent || (nameAlreadyExists && !editMode)) return;

    const data: IProcess = {
      id: editMode ? (process?.id as string) : idGenerator(),
      name,
      svg: svgContent,
      color,
    };

    if (editMode) {
      dispatch(editProcess(data));
    } else {
      dispatch(setItems({ data, itemName: PROCESSES }));
      setColor('#000000');
      setError(null);
      setName('');
      setSvgContent(null);
    }

    setModalIsOpen(false);
  };

  return (
    <dialog
      className={`absolute z-10 -bottom-3 ${
        !processes[0] ? '-right-24' : '-right-16'
      } ${
        i === processes.length - 1 ? 'right-0' : ''
      } ${!editMode ? !processes[0] ? '-right-24' : '-right-11' : ''} p-1 pr-2 bg-slate-500 rounded-md 'w-40'`}
    >
      <form className="flex" onSubmit={(e) => onSubmit(e)}>
        <UploadImage
          setSvgContent={setSvgContent}
          color={color}
          svgContent={svgContent}
          handleFileChange={handleFileChange}
        />
        <Input
          className="pl-1 text-white w-28"
          changeHandler={(e) => setName(e.target.value)}
          inputValue={name}
          ref={nameInputRef}
          required
        />
        <div className="w-5 h-6">
          <Input
            className="w-full h-full rounded-sm"
            changeHandler={(e) => setColor(e.target.value)}
            inputValue={color}
            type="color"
          />
        </div>
      </form>
      <div className="text-red-600 absolute top-10">{error}</div>
    </dialog>
  );
};

export default AddProcessModal;
