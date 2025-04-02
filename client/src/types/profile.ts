export interface ProfileData {
  email: string;
  fullName: string;
  username: string;
  phone: string;
  location: string;
  website: string;
  bio: string;
}

export type ScoialLinks = Array<{
  service_type: string;
  service_label: string;
  service_icon: string;
  url: string;
  is_hidden: boolean;
}>;

export type Links = Array<{
  label: string;
  url: string;
}>;

export interface GravatarData {
  display_name: string;
  profile_url: string;
  location: string;
  job_title: string;
  first_name?: string;
  last_name?: string;
  description: string;
  verified_accounts: ScoialLinks;
  links: Links;
  avatar_url: string;
}

export interface ConvertedGravatarResponseType {
  profileImage: string;
  fullName: string;
  username: string;
  location: string;
  bio: string;
  websites: Array<{
    label: string;
    url: string;
  }>;
  profileUrl: string;
  socialLinks: ScoialLinks;
}

export interface FormData {
  email: string;
  fullName: string;
  username: string;
  phone: string;
  location: string;
  website?: string;
  bio?: string;
  profileImage?: string;
  profileUrl?: string;
  socialLinks?: ScoialLinks;
}
