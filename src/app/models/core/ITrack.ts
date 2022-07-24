import { IAlbum } from "./IAlbum";
import { IArtist } from "./IArtist";

export interface ITrack {
  id: string;
  name: string;
  album: IAlbum;
  artist: IArtist;
  duration: number;
  popularity: number;
  local: boolean;
  explicit: boolean;
  type: string;
  uri: string;
}
