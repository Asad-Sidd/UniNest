export interface Ratings {
  landlordBehavior: number;
  hygiene: number;
  safety: number;
  overall: number;
}

export interface Review {
  _id: string;
  propertyId: string;
  studentId: {
    _id: string;
    name: string;
  };
  ratings: Ratings;
  comment: string;
  createdAt: string;
}
