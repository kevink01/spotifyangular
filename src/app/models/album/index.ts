import { Core } from '../core/core';
import { Image } from '../core/image';

export interface Album extends Core {
  artists: Core[]; // Basic information
  date: Date;
  images: Image[];
  tracks: number;
}
