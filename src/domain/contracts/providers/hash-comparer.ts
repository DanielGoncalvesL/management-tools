export interface HashComparer {
  compare: (params: HashComparer.Params) => Promise<HashComparer.Result>;
}

export namespace HashComparer {
  export type Params = {
    plaintext: string;
    textToCompare: string;
  };

  export type Result = boolean;
}
