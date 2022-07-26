import { Image } from './Image';

export interface IArtist {
  id: string;
  name: string;
  images: Image[];
  type: string;
  uri: string;
}
