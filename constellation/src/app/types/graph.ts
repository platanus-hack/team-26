export type Node = {
  id: string;
  color?: string;
  x?: number;
  y?: number;
};

export type Link = {
  source: string;
  target: string;
  color?: string;
};
