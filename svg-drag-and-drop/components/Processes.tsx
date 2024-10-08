'use client';

import { useState } from 'react';
import { replaceProcesses } from '@/redux/features/generalSlice';
import { useAppDispatch } from '@/redux/hooks';
import { ProcessCard } from '@/components';

interface IProcessesProps {
  processes: IProcess[];
}

const Processes = ({ processes }: IProcessesProps) => {
  const dispatch = useAppDispatch();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      const updatedProcesses = [...processes];

      [updatedProcesses[draggedIndex], updatedProcesses[index]] = [
        updatedProcesses[index],
        updatedProcesses[draggedIndex],
      ];
      dispatch(replaceProcesses(updatedProcesses));
      setDraggedIndex(null);
    }
  };

  return (
    <div className='flex'>
      {processes.map((process, i) => {
        return (
          <ProcessCard
            key={process.id}
            i={i}
            process={process}
            handleDragOver={handleDragOver}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
          />
        );
      })}
    </div>
  );
};

export default Processes;
