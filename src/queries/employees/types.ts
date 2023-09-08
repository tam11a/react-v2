export type ICreateEmployee = {
  first_name: string;
  last_name: string;
  username: string;
  gender: string;
  password: string;
  display_picture: string;
  email: string;
  phone: string;
  dob: string;
  hired_date: string;
  work_hour: number;
  salary: number;
  bank: string;
  address: string;
};

export type IUpdateEmployee = {
  first_name: string;
  last_name: string;
  gender: string;
  password: string;
  display_picture: string;
  email: string;
  phone: string;
  dob: string;
  hired_date: string;
  work_hour: number;
  salary: number;
  bank: string;
  address: string;
};
