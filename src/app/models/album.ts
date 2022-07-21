import { Artist } from "./artist";
import { Image } from "./image";
export interface Album {
  id: string;
  type: string;
  name: string;
  release: Date;
  tracks: number;
  artists: Artist[];
  images: Image[];
  uri: string;
}
