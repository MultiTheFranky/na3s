export type VoteCommand = {
  commandName: string;
  preMissionStart?: boolean;
  postMissionStart?: boolean;
  votingThreshold?: number;
  percentSideVotingThreshold?: number;
};
