// データをセットする配列を用意
// types/menu.ts

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  comment?: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  review?: number;
  quantity?: number;
};
