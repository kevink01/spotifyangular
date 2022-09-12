import { Track } from "../shared/track";

export interface Queue {
  current: Track
  queue: Track[];
}