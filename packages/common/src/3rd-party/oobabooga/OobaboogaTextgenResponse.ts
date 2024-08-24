export type OobaboogaTextgenResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OobaboogaChoice[];
};

export const isOobaboogaChoice = (maybe: unknown): maybe is OobaboogaChoice => {
  const straw = maybe as OobaboogaChoice;
  return typeof straw === "object" && typeof straw.text === "string";
};

export type OobaboogaChoice = {
  index: number;
  finish_reason: null;
  text: string;
  logprobs: Logprobs;
};

type Logprobs = {
  top_logprobs: object[];
};
