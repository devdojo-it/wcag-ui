// fileArrayOrList: File[] | FileList
// returns a FileList instance
export const buildFileList = (fileArrayOrList) => {
  if (fileArrayOrList instanceof FileList) {
    return fileArrayOrList;
  }

  const dataTransfer = new DataTransfer();

  for (const file of fileArrayOrList) {
    dataTransfer.items.add(file);
  }

  return dataTransfer.files;
};

// fileArrayOrList: File[] | FileList
// returns a File[]
export const buildFileArray = (fileArrayOrList) => {
  if (fileArrayOrList instanceof Array) {
    return fileArrayOrList;
  }

  return Array.from(fileArrayOrList);
};
