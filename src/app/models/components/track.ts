import { Core } from '../core/core';

export interface Track extends Core {
  album: Core;
  artists?: Core[];
  date?: Date;
  duration: number;
  explicit: boolean;
  local: boolean;
  number: boolean;
  popularity: number;
}
