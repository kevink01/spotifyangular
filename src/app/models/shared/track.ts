import { Album } from './album';
import { Core } from '../core/core';

export interface Track extends Core {
  album: Album;
  artists: Core[];
  date: Date;
  duration: number;
  explicit: boolean;
  local: boolean;
  number: number;
  popularity: number;
}
