import { Core } from '../core/core';
import { Image } from '../core/image';

export interface Album extends Core {
  date: Date;
  images: Image[];
}
