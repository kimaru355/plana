export interface EventCreate {
  id: string;
  title: string;
  description: string;
  dateTime: Date;
  country: string;
  city: string;
  location: string;
  capacity: number;
  images: string;
  createdAt?: Date;
  updatedAt?: Date;
  organizerId: string;
  categoryId: string;
}
export interface EventCreateImagesArray {
  id: string;
  title: string;
  description: string;
  dateTime: Date;
  country: string;
  city: string;
  location: string;
  capacity: number;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
  organizerId: string;
  categoryId: string;
}
