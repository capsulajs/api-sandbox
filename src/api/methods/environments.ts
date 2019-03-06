import { Observable } from 'rxjs';
import { Env } from '../Env';

export interface EnvironmentsRequest {}

export type EnvironmentsResponse = Observable<Env>;
