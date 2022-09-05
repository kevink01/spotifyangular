import { Image } from '../core/image';
import { Core } from './core';

export interface Profile extends Core {
  followers: number;
  images: Image[];
}
