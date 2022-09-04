import { Core } from "../../core/core";
import { Playlist } from "./playlist";

export interface FeaturedPlaylist extends Core {
  message: string;
  playlists: Playlist[];
}