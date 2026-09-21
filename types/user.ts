export type UserType = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  firstName: string;
  lastName: string;
  bio: string;
  membershipActive: boolean;
  reviews: {
    id: number;
    comment: string;
    waitingTime: number;
    recommend: number;
    bedsideManner: number;
    visitAgain: number;
    createdAt: string;
    updatedAt: string;
  }[];
};