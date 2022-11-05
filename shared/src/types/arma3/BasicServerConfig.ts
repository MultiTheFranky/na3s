export type BasicServerConfig = {
  MaxMsgSend?: number;
  MaxSizeGuaranteed?: number;
  MaxSizeNonguaranteed?: number;
  MinBandwidth?: number;
  MaxBandwidth?: number;
  MinErrorToSend?: number;
  MinErrorToSendNear?: number;
  MaxPacketSize?: number;
  MaxCustomFileSize?: number;
};
