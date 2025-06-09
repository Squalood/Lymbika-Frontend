export type ReviewType = {
  id: number;
  waitingTime: number;
  recommend: number;
  bedsideManner: number;
  visitAgain: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
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