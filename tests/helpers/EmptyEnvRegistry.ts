import { from } from 'rxjs';

const emptyWorkspaceEnvs$ = from([]);

export default class EmptyEnvRegistry {
  public environments$() {
    return emptyWorkspaceEnvs$;
  }
}
