interface ILineAndRoundProps {
  prevColor: string;
  nextColor: string;
  color: string;
  i: number;
  articleHovered: number | null;
}

const LineAndRound = ({articleHovered, color, i, nextColor, prevColor}: ILineAndRoundProps) => {
  return (
    <div
      style={{
        background: `linear-gradient(to right, ${prevColor} -36%, ${color} 32%, ${color} 60%, ${nextColor} 130%)`,
      }}
      className={`${
        i === 0 ? 'w-1/2 self-end' : 'w-full'
      } flex justify-center relative h-1 mt-2`}
    >
      <span
        style={{ backgroundColor: color }}
        className={`absolute ${
          i === 0 ? 'left-0' : ''
        } -bottom-1.5 rounded-full w-4 h-4`}
      />
      {i === articleHovered && (
        <span
          style={{ backgroundColor: color }}
          className={`absolute  ${
            i === 0 ? '-left-3' : ''
          } -bottom-[18px] rounded-full w-10 h-10 opacity-45`}
        />
      )}
    </div>
  );
};

export default LineAndRound;
