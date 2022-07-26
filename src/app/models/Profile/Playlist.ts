import { IPlaylist } from '../core/IPlaylist';
import { Track } from './Track';

export interface Playlist extends IPlaylist {
  tracks: Track[];
}
