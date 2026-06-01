export interface Project {
  id: string;
  titulo: string;
  descricao: string;
  tecnologias: string[];
  imagemUrl?: string;
  linkDemo?: string;
  linkRepo?: string;
  destaque: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  titulo: string;
  descricao: string;
  tecnologias: string[];
  imagemUrl?: string;
  linkDemo?: string;
  linkRepo?: string;
  destaque?: boolean;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {}

export interface LoginDto {
  email: string;
  senha: string;
}

export interface AuthResponse {
  access_token: string;
  user: { id: string; email: string };
}
