export type ICreateMedia = {
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  display_picture: string;
  email?: string;
  phone: "number";
  address_line1?: string;
  address_line2?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

export type IUpdateMedia = {
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  display_picture: string;
  email?: string;
  phone: "number";
  address_line1?: string;
  address_line2?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};
