export interface TokenValidator {
  decrypt(params: TokenValidator.Params): Promise<TokenValidator.Result>;
}

export namespace TokenValidator {
  export type Params = { token: string };

  export type Result = { key: string } | false;
}
