export class ToolAlreadyUseError extends Error {
  constructor() {
    super('Tool already use');
    this.name = 'ToolAlreadyUseError';
  }
}
