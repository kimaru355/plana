export interface Event {
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
export interface EventImagesArray {
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
