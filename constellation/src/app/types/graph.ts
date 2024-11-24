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
  cluster: number;
  isRepresentative: boolean;
  category: string;
};

export type CosmosInputNode = {
  id: string;
  metadata?: Metadata;
  x?: number;
  y?: number;
};

export type GraphData = {
  id: string;
  title: string;
  description: string;
  results: string;
  cluster: string;
  is_representative: boolean;
  category: string;
};
