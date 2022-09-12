import { Track } from '../shared/track';
import { ActiveDevice } from './activeDevice';

export interface Playback {
  device: ActiveDevice;
  playing: boolean;
  progress: number;
  repeat: string;
  shuffle: boolean;
  track: Track;
}
