import { Observable } from 'rxjs';
import { Env, EnvironmentsRequest, SelectEnvRequest, SelectedEnvRequest } from './Env';
import { Method, MethodsRequest, SelectMethodRequest, SelectedMethodRequest } from './Method';
import { InvokeRequest, LogsRequest, APISandboxEvent } from './Invoke';

export interface APISandbox {
  // Provides observable of all available environments
  environments$(environmentsRequest: EnvironmentsRequest): Observable<Env>;
  // Select an environment
  selectEnv(selectEnvRequest: SelectEnvRequest): Promise<void>;
  // Provide observable on the currently selected environment
  selectedEnv$(selectedEnvRequest: SelectedEnvRequest): Observable<Env>;

  // Provides list of available service methods in the selected environment
  methods$(methodsRequest: MethodsRequest): Observable<Method>;
  // Select an service method
  selectMethod(selectMethodRequest: SelectMethodRequest): Promise<void>;
  // Provide observable on the currently selected service method
  selectedMethod$(selectedMethodRequest: SelectedMethodRequest): Observable<Method>;

  // Invoke the currently selected service  method with a request
  invoke(invokeRequest: InvokeRequest): Promise<void>;

  // Provide an observable of all events (requests, responses)
  logs(logsRequest: LogsRequest): Observable<APISandboxEvent>;
}
