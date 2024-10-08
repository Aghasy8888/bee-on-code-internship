'use client';

import { useState } from 'react';
import { AddProcess, Processes } from '@/components';
import { PROCESSES } from '@/constants';
import useGetItemFromStorage from '@/hooks/useGetItemFromStorage';
import useUpdateLocalStorage from '@/hooks/useUpdateLocalStorage';
import { selectProcesses } from '@/redux/features/generalSlice';
import { useAppSelector } from '@/redux/hooks';
import useCloseModal from '@/hooks/useCloseModal';

import styles from './styles.module.css';

const SvgDragAndDrop = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [color, setColor] = useState('#000000');
  const [error, setError] = useState<string | null>(null);
  useUpdateLocalStorage();
  const processes = useAppSelector(selectProcesses);
  useGetItemFromStorage(PROCESSES);

  useCloseModal(modalIsOpen, setModalIsOpen);

  return (
    <section className="py-5 pl-10">
      <h1 className="text-white mb-2 font-bold">ПРОЦЕССИ</h1>
      <div className="flex">
        <div
          className={`flex relative ${!processes[0] ? 'min-w-12' : ''} h-36  ${
            styles.scrollbarHide
          } ${processes.length < 2 ? styles.lessThanTwo : ''}`}
        >
          <Processes processes={processes} />
        </div>
        <AddProcess
          setModalIsOpen={setModalIsOpen}
          colorState={{ color, setColor }}
          errorState={{ error, setError }}
          modalIsOpen={modalIsOpen}
          nameState={{ name, setName }}
          svgContentState={{ setSvgContent, svgContent }}
        />
      </div>
    </section>
  );
};

export default SvgDragAndDrop;
