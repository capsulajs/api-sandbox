export interface InvokeRequest {
  data: any[];
}

export interface LogsRequest {}

export interface APISandboxEvent {
  timestamp: number;
  correlationId: number;
  type: 'request' | 'response';
  serviceName: string;
  methodName: string;
  request?: InvokeRequest;
  response?: any;
}
