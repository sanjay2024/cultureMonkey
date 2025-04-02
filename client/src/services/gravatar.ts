/* eslint-disable @typescript-eslint/no-explicit-any */

import { GravatarData } from "../types/profile";
import { stringToSha256 } from "../utils";
import { AxiosWrapper as axios } from "./axios";

export const fetchGravatarProfile = async (
  emailId: string
): Promise<GravatarData> => {
  const hashedEmail = await stringToSha256(emailId);

  return axios
    .get<GravatarData>(`/profiles/${hashedEmail}`)
    .then((result) => {
      return result.data;
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });
};
