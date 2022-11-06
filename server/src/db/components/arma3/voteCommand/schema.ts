import joi from "joi";
import { Schema } from "mongoose";
import { Arma3VoteCommand } from "shared";

export const DBArma3VoteCommandSchema = new Schema<Arma3VoteCommand>({
  commandName: {
    type: String,
    required: true,
  },
  preMissionStart: {
    type: Boolean,
    required: false,
    default: true,
  },
  postMissionStart: {
    type: Boolean,
    required: false,
    default: true,
  },
  votingThreshold: {
    type: Number,
    required: false,
    default: 0.5,
  },
  percentSideVotingThreshold: {
    type: Number,
    required: false,
    default: 0.5,
  },
});

export const arma3VoteCommandSchema: joi.ObjectSchema<Arma3VoteCommand> =
  joi.object({
    commandName: joi.string().required(),
    preMissionStart: joi.boolean().required(),
    postMissionStart: joi.boolean().required(),
    votingThreshold: joi.number().required(),
    percentSideVotingThreshold: joi.number().required(),
  });
