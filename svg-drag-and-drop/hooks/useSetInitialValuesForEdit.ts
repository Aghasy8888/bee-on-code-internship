import { useEffect } from 'react';

const useSetInitialValuesForEdit = (
  process: IProcess | undefined,
  setColor: TSetString,
  setName: TSetString,
  setSvgContent: TSetStringOrNull,
  setError: TSetStringOrNull
) => {
  useEffect(() => {
    if (process) {
      const { color, name, svg } = process;
      setColor(color);
      setName(name);
      setSvgContent(svg);
      setError(null);
    }
  }, []);
};

export default useSetInitialValuesForEdit;
