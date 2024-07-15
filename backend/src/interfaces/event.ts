export interface EventCreate {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
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
export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
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
  startTime: Date;
  endTime: Date;
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
