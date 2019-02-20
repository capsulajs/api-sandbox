export interface Method {
  serviceName: string;
  methodName: string;
  type: 'Observable' | 'Promise';
  // requestTemplate: any[];
  // documentation: string; // URL ? Markdown text ?
}

export interface MethodsRequest {}

export interface SelectMethodRequest {
  serviceName: string;
  methodName: string;
}

export interface SelectedMethodRequest {}
