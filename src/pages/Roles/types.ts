export type IRoles = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  updated_at: string;
  prefix: string;
  total_employees: number;
  total_permissions: number;
  deleted_at?: string;
};
