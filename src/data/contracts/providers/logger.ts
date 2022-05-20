export interface Logger {
  logging: (params: Logger.Params) => void;
}

export namespace Logger {
  export type Params = {
    paramToLogger: string | object | Error;
  };
}
