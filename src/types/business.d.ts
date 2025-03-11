import type { Category } from "@types/category";

export interface Business {
  message?: boolean;
  id: string;
  ownerId: string;
  name: string;
  description: string;
  url_image: string;
  category: Category;
  address: string;
  tel: string;
  web_site: null;
  social_networks: null;
  status: boolean;
}

export interface CreateBusiness {
  ownerId: string;
  name: string;
  description: string;
  category: Category;
  address: string;
  tel: string;
  status: boolean;
  social_networks: null;
}
