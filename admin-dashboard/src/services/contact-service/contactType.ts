type PhoneNumber = {
  phone: string;
  tag: string;
  is_primary: number;
};

type Email = {
  email: string;
  tag: string;
  is_primary: number;
};

export type NewContact = {
  first_name?: string;
  last_name: string;
  first_name_kana:string;
  last_name_kana:string;
  first_name_kanji:string;
  last_name_kanji:string;
  nick_name?: string;
  web_url?: string;
  address?: string;
  birthday?: string | null;
  notes?: string;
  country?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phones?: PhoneNumber[];
  emails?: Email[];
};

export type Contact = {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  dob: string;
  phone: string;
};
