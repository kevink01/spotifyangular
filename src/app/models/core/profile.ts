import { Image } from '../core/image';
import { Core } from './core';

export interface Profile extends Core {
  country: string;
  email: string;
  followers: number;
  images: Image[];
  product: string;
}
