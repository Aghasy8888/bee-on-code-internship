export const getItemFromStorage = (
  item: string,
  window: Window & typeof globalThis
) => {
  if (
    typeof window !== 'undefined' &&
    typeof window.localStorage.getItem(item) === 'string'
  ) {
    return JSON.parse(window.localStorage.getItem(item) as string);
  }
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const processImagesForLocalStorage = async (
  imageFiles: (File | null)[]
) => {
  const nonNullFiles = imageFiles.filter((file) => file !== null) as File[];
  const base64Images = await Promise.all(
    nonNullFiles.map((file) => convertToBase64(file))
  );

  return JSON.stringify(base64Images);
};

export const applySizesToSvg = (
  svgText: string,
  width: number,
  height: number
) => {
  svgText = svgText?.replace(/width="(.*?)"/g, `width="${width}px"`);
  svgText = svgText?.replace(/height="(.*?)"/g, `height="${height}px"`);

  return svgText;
};

export const nameExists = (processes: IProcess[], name: string) =>
  processes.some((p) => p.name === name);

export const idGenerator = () => {
  return (
    Math.random().toString(32).slice(2) +
    "-" +
    Math.random().toString(32).slice(2) +
    "-" +
    Math.random().toString(32).slice(2)
  );
}

export const applyColorToSvg = (svgText: string, color: string) => {
  svgText = svgText.replace(/fill="(.*?)"/g, `fill="${color}"`);
  svgText = svgText.replace(/fill:(.*?);/g, `fill:${color};`);

  return svgText;
};
