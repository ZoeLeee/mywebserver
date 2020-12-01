export interface IArticleOption {
  title: string;
  content: string;
  time?: string;
  imgUrl?: string;
  scanCount?: number;
  tags: string[];
  _id?: string;
}

export interface IProjectOption {
  id?: string;
  title: string;
  content: string;
  categoryId: string;
  time?: string;
  imgUrl?: string;
  scanCount?: number;
  showUrl?: string;
  github?: string;
  gitee?: string;
  description: string;
  status?: number;
}