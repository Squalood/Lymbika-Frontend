export type ReviewType = {
  id: number;
  waitingTime: number;
  recommend: number;
  bedsideManner: number;
  visitAgain: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  User: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    mediClubRegular: boolean;
  };
  doctor: {
    id: number;
    doctorName: string;
    slug: string;
  };
};