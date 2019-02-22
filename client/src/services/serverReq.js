import axios from 'axios';

export const getFolderFromServer = async folderPath =>
  await axios.get(`/getFolder`, {
    params: {
      folderPath,
    },
  });
export const getFolder = async folderPath => {
  const contentFolder = await getFolderFromServer(folderPath);
  return contentFolder;
};

export const createElementOnServer = async (
  elementPath,
  elementName,
  elementType
) =>
  await axios.post(`/getFolder`, {
    elementPath,
    elementName,
    elementType,
  });

export const isElementCreated = async (
  elementPath,
  elementName,
  elementType
) => {
  const { status: response } = await createElementOnServer(
    elementPath,
    elementName,
    elementType
  );
  return response;
};

export const deleteElementFromServer = async (elementPath, elementType) =>
  await axios.delete(`/getFolder`, {
    params: {
      elementPath,
      elementType,
    },
  });

export const isElementDeleted = async (elementPath, elementType) => {
  const { status: response } = await deleteElementFromServer(
    elementPath,
    elementType
  );
  return response;
};
