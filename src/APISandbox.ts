import { Observable, from, BehaviorSubject } from 'rxjs';
import { APISandbox as APISandboxInterface } from './api/APISandbox';
import { Env } from './api/Env';
import { EnvironmentsRequest, SelectedEnvRequest, SelectEnvRequest } from './api/methods';
import { InvokeRequest, LogsRequest, APISandboxEvent } from './api/Invoke';
import { Method, MethodsRequest, SelectMethodRequest, SelectedMethodRequest } from './api/Method';
import { isEnvKeyValid } from './validators';
import { errorMessage, validationMessages } from './errors';
import { filter, take } from 'rxjs/operators';
import isEmpty from 'lodash/isEmpty';

export default class APISandbox implements APISandboxInterface {
  private readonly selectedEnvironmentSubject: BehaviorSubject<Env>;

  constructor() {
    this.selectedEnvironmentSubject = new BehaviorSubject<Env>({} as Env);
  }

  public environments$(environmentRequest: EnvironmentsRequest): Observable<Env> {
    return new Observable((observer) => {
      (window as any).workspace.service({ serviceName: 'EnvRegistry' }).then((data: any) => {
        data.proxy.environments$({}).subscribe({
          next: (env: Env) => observer.next(env),
          error: (err: Error) => observer.error(new Error(err.message)),
          complete: () => observer.complete(),
        });
      });
    });
  }

  public selectEnv(selectEnvRequest: SelectEnvRequest): Promise<void> {
    if (!isEnvKeyValid(selectEnvRequest)) {
      return Promise.reject(new Error(validationMessages.envKeyIsNotCorrect));
    }
    if (this.selectedEnvironmentSubject.getValue().envKey === selectEnvRequest.envKey) {
      return Promise.reject(new Error(errorMessage.envAlreadySelected));
    }
    return new Promise((resolve, reject) => {
      this.environments$({})
        .pipe(
          filter((env) => env.envKey === selectEnvRequest.envKey),
          take(1)
        )
        .subscribe({
          next: (env) => this.selectedEnvironmentSubject.next(env),
          error: (error) => reject(new Error(error)),
          complete: () => {
            if (
              !this.selectedEnvironmentSubject.getValue().envKey ||
              this.selectedEnvironmentSubject.getValue().envKey !== selectEnvRequest.envKey
            ) {
              reject(new Error(errorMessage.envNotFound));
            } else {
              resolve();
            }
          },
        });
    });
  }

  public selectedEnv$(selectedEnvRequest: SelectedEnvRequest): Observable<Env> {
    return from(this.selectedEnvironmentSubject).pipe(filter((env) => !isEmpty(env)));
  }

  public methods$(methodsRequest: MethodsRequest): Observable<Method> {
    return from([]);
  }

  public selectMethod(selectMethodRequest: SelectMethodRequest): Promise<void> {
    return Promise.resolve();
  }

  public selectedMethod$(selectedMethodRequest: SelectedMethodRequest): Observable<Method> {
    return from([]);
  }

  public invoke(invokeRequest: InvokeRequest): Promise<void> {
    return Promise.resolve();
  }

  public logs$(logsRequest: LogsRequest): Observable<APISandboxEvent> {
    return from([]);
  }
}
