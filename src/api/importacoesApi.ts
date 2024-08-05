import { postUploadFileFetcher } from "./baseApi";


const apiUploadOfx = async (idUser: number, idUe: number, dataObject: FormData) => {
  return postUploadFileFetcher(`/v1/import/upload-ofx/${idUser}/${idUe}`, dataObject);
}


export { apiUploadOfx };

