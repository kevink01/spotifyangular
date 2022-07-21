import { User } from './user';
import { Image } from './image';
import { Track } from './track';

export interface Playlist {
  id: string;
  type: string;
  name: string;
  owner: User;
  description: string;
  tracks?: Track[];
  count: number;
  public: boolean;
  collaborative: boolean;
  images: Image[];
  uri: string;
}
