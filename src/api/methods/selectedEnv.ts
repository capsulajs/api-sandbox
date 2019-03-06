import { Observable } from 'rxjs';
import { Env } from '../Env';

export interface SelectedEnvRequest {}

export type SelectedEnvResponse = Observable<Env>;
