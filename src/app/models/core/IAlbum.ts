import { Image } from './image';
import { IArtist } from './IArtist';
/**
 * Critical information about each Album.
 */
export interface IAlbum {
  id: string;
  name: string;
  artist: IArtist;
  date: Date;
  images: Image[];
  type: string;
  uri: string;
}
