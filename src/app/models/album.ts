import { Copyright } from './core/copyright';
import { Core } from './core/core';
import { Image } from './core/image';
import { Track } from './Profile/Track';

export interface Album extends Core {
  artists: Core[];
  copyrights: Copyright[];
  genres: string[];
  images: Image[];
  date: Date;
  popularity: number;
  tracks: Track[];
}
