import { Image } from './Image';
import { User } from './User';

export interface IPlaylist {
  id: string;
  name: string;
  description: string;
  owner: User;
  images: Image[];
  public: boolean;
  collaborative: boolean;
  snapshot: string;
  type: string;
  uri: string;
}
