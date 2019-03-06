export const isEnvKeyValid = (request: any) => request && request.envKey && typeof request.envKey === 'string';
