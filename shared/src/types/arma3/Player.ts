import { Side } from "./Side";

export type Player = {
  id: string;
  name: string;
  color: string;
  side: Side;
  isAI: boolean;
  isDead: boolean;
  isSpectator: boolean;
  isPlayable: boolean;
  isLocal: boolean;
  isServer: boolean;
  isHC: boolean;
  isUAV: boolean;
  isPlayer: boolean;
  isUnit: boolean;
  isGroup: boolean;
};
