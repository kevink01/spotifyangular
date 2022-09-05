import { Copyright } from '../core/copyright';
import { Core } from '../core/core';
import { Image } from '../core/image';
import { Track } from './track';

export interface Album extends Core {
  artists: Core[]; // Basic information
  copyrights: Copyright[];
  date: Date;
  genres: string[];
  images: Image[];
  popularity: number;
  tracks?: Track[]; // can be null for generic information
}
