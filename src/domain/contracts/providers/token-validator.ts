export interface TokenValidator {
  validate(token: TokenValidator.Params): Promise<TokenValidator.Result>;
}

export namespace TokenValidator {
  export type Params = { token: string };

  export type Result = { id: string } | false;
}
