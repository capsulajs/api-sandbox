import { workspaceEnvs$ } from './envsMock';

export default class EnvRegistry {
  public environments$() {
    return workspaceEnvs$;
  }
}
