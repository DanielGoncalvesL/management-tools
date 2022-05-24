export interface Logger {
  logging: (params: Logger.Params) => Promise<void>;
}

export namespace Logger {
  export type Params = {
    paramToLogger: string | object | Error;
  };
}
