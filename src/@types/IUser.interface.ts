export enum EnglishLevels {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum SubscriptionPlan {
  FREE = "free",
  PREMIUM = "premium",
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  level: keyof typeof EnglishLevels;
  xp: number;
  streak: number;
  isEmailVerified: boolean;
  subscription: {
    plan: SubscriptionPlan;
    startDate?: string;
    endDate?: string;
  };
  badges: string[];
  createdAt: string;
}
