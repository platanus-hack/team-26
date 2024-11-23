export type Node = {
  id: string;
  color?: string;
  metadata?: Metadata;
  x?: number;
  y?: number;
};

export type Link = {
  source: string;
  target: string;
  color?: string;
};

export type Metadata = {
  title: string;
  description: string;
  results: string;
  embeding: [number, number];
  cluster: number;
};

export type CosmosInputNode = {
  id: string;
  metadata?: Metadata;
  x?: number;
  y?: number;
};
