'use client';

import { useEffect, useState } from 'react';
import { ButtonWithImg, Title } from '@/common';
import { editIcon, trashIcon } from '@/public/assets';
import { AddProcessModal, LineAndRound } from '@/components';
import { applySizesToSvg } from '@/helpers';
import useCloseModal from '@/hooks/useCloseModal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeProcess, selectProcesses } from '@/redux/features/generalSlice';

interface IProcessCardProps {
  i: number;
  process: IProcess;
  handleDragStart: (i: number) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (i: number) => void;
}

const ProcessCard = ({
  i,
  process,
  handleDragOver,
  handleDragStart,
  handleDrop,
}: IProcessCardProps) => {
  const dispatch = useAppDispatch();
  const processes = useAppSelector(selectProcesses);
  const { color, name, svg } = process;
  const prevColor = processes[i - 1]?.color || color;
  const nextColor = processes[i + 1]?.color || color;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name_, setName] = useState('');
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [color_, setColor] = useState('#000000');
  const [error, setError] = useState<string | null>(null);
  const [articleHovered, setArticleHovered] = useState<number | null>(null);
  useCloseModal(modalIsOpen, setModalIsOpen);

  useEffect(() => {
    setTimeout(() => {
      setArticleHovered(null);
    }, 0);
  }, [JSON.stringify(processes)]);

  const onRemoveProcess = (id: string) => {
    dispatch(removeProcess(id));
  };

  return (
    <article
      className={`relative flex flex-col justify-between items-center h-28 w-32 max-w-32`}
      draggable
      onDragStart={() => handleDragStart(i)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(i)}
      onMouseEnter={() => setArticleHovered(i)}
      onMouseLeave={() => setArticleHovered(null)}
    >
      <div className="relative w-[40px] h-[45px] ">
        <div
          className="flex justify-center w-full h-full relative object-cover"
          dangerouslySetInnerHTML={{ __html: applySizesToSvg(svg, 40, 46) }}
        />
      </div>
      <LineAndRound
        articleHovered={articleHovered}
        color={color}
        i={i}
        nextColor={nextColor}
        prevColor={prevColor}
      />
      <Title name={name} />
      {modalIsOpen && (
        <AddProcessModal
          i={i}
          errorState={{ error, setError }}
          colorState={{ color: color_, setColor }}
          nameState={{ name: name_, setName }}
          svgContentState={{ setSvgContent, svgContent }}
          setModalIsOpen={setModalIsOpen}
          editMode
          process={process}
        />
      )}

      <ButtonWithImg
        onClick={() => setModalIsOpen(true)}
        alt="editIcon"
        className="absolute right-0.5 top-0"
        src={editIcon}
      />
      <ButtonWithImg
        onClick={() => onRemoveProcess(process.id)}
        alt="trashIcon"
        className="absolute right-1 top-5"
        src={trashIcon}
      />
    </article>
  );
};

export default ProcessCard;
