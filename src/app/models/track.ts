import { Album } from './album';
import { Artist } from './artist';

export interface Track {
  added_at: Date;
  isLocal: boolean;
  album: Album;
  artists: Artist[];
  duration: number;
  explicit: boolean;
  id: string;
  name: string;
  type: string;
  uri: string;
}
