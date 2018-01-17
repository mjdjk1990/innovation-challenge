export interface Profile {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  office: {
    city: string;
    country: string;
  };
  quote: string;
}