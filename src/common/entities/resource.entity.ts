export interface Resource {
  quantity: number;
}

export interface ResourceWithCap extends Resource {
  quantity: number;
  maximum: number;
}

export enum ResourceType {
  Wood,
  Clay,
  Iron,
}