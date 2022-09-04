import { Core } from '../../core/core';
import { Image } from '../../core/image';

export interface Playlist extends Core {
  collaborative: boolean;
  description: string;
  images: Image[];
  owner: Core;
  public: boolean;
  snapshot: boolean;
  tracks: number;
}
