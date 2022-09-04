import { Core } from '../core/core';
import { Image } from '../core/image';

export interface Artist extends Core {
  followers: number;
  genres: string[];
  images: Image[];
  popularity: number;
}
