export type ILeads = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  gender: string;
  designation: string;
  address_line1: string;
  address_line2: string;
  company: string;
  status: {
    id: number;
    label: string;
    value: string;
    color: string;
    type: string;
  };
  deleted_at?: string;
};
