export interface Hasher {
  hash: (params: Hasher.Params) => Promise<Hasher.Result>;
}

namespace Hasher {
  export type Params = {
    plaintext: string;
  };

  export type Result = string;
}
