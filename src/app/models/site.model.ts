export interface Site {
  id: number;
  nome: string;
  url: string;
  icon: string;
  selected: boolean;
  criado_em?: Date;
}

export interface UpdateSiteDTO {
  id: number;
  selected: boolean;
}

export interface WorkspaceDTO {
  urls: string[];
}