/**
 * Normalizes an array of File or a FileList into a FileList instance.
 *
 * @param {File[] | FileList} fileArrayOrList
 * @returns {FileList}
 */
const buildFileList = (fileArrayOrList) => {
  if (fileArrayOrList instanceof FileList) {
    return fileArrayOrList;
  }

  const dataTransfer = new DataTransfer();

  for (const file of fileArrayOrList) {
    dataTransfer.items.add(file);
  }

  return dataTransfer.files;
};

/**
 * Normalizes an array of File or a FileList into a File[] array.
 *
 * @param {File[] | FileList} fileArrayOrList
 * @returns {File[]}
 */
const buildFileArray = (fileArrayOrList) => {
  if (Array.isArray(fileArrayOrList)) {
    return fileArrayOrList;
  }

  return Array.from(fileArrayOrList);
};

const files = {
  buildFileList,
  buildFileArray,
};

export { files };
