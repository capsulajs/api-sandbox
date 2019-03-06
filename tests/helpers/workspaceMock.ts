import EnvRegistry from './envRegistryMock';
import EmptyEnvRegistry from './EmptyEnvRegistry';

export default class Workspace {
  private readonly emptyEnv: boolean;

  constructor(args: { emptyEnv: boolean }) {
    this.emptyEnv = args.emptyEnv;
  }

  public service(request: any) {
    let proxy = new EnvRegistry();
    if (this.emptyEnv) {
      proxy = new EmptyEnvRegistry();
    }
    return Promise.resolve({ proxy });
  }
}
