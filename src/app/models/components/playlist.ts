import { Core } from '../core/core';
import { Image } from '../core/image';
import { Track } from '../shared/track';

export interface Playlist extends Core {
  collaborative: boolean;
  description: string;
  images: Image[];
  owner: Core;
  public: boolean;
  snapshot: string;
  tracks: Track[];
}
