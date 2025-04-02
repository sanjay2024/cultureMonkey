import { ConvertedGravatarResponseType, GravatarData } from "./types/profile";

export const stringToSha256 = async (str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const getFullName = (
  firstName: string,
  lastName: string,
  displayName: string
): string => {
  if (firstName && lastName) return `${firstName} ${lastName}`;
  else if (firstName) return firstName;

  return displayName;
};

export const convertGravatarResponse = (
  gravatarData: GravatarData
): ConvertedGravatarResponseType => {
  return {
    profileImage: gravatarData.avatar_url,
    fullName: getFullName(
      gravatarData?.first_name || "",
      gravatarData?.last_name || "",
      gravatarData.display_name
    ),
    username: gravatarData.display_name,
    location: gravatarData.location,
    bio: gravatarData.description,
    websites: gravatarData.links,
    profileUrl: gravatarData.profile_url,
    socialLinks: gravatarData.verified_accounts,
  };
};

export const classNames = (
  classes: Record<string, boolean>
): string | undefined => {
  const currentClasses: Array<string> = [];

  Object.entries(classes).forEach(([key, value]) => {
    if (value) {
      currentClasses.push(key);
    }
  });

  if (currentClasses.length) {
    return currentClasses.join(" ");
  } else {
    return undefined;
  }
};
