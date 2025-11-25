export interface UserInfo {
  email: string;
  nickname: string;
  profile: {
    career: string;
    purpose: string;
    goal: string;
    techStacks: string[];
    profileImage: string;
  };
}

export interface TechStackItem {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TechStackSearchResponse {
  results: TechStackItem[];
}

export interface TechStackCreateResponse {
  techStack: TechStackItem;
}
