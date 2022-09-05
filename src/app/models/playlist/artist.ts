import { Core } from '../core/core';
import { Image } from '../core/image';

export interface Artist extends Core {
  images: Image[];
}
