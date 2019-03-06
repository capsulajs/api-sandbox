import { from } from 'rxjs';

export const environments: any = {
  develop: {
    accessPoints: [{ url: 'http://accessPoint/dev/service1' }, { url: 'http://accessPoint/dev/service2' }],
  },
  master: {
    accessPoints: [{ url: 'http://accessPoint/master/service1' }, { url: 'http://accessPoint/master/service2' }],
  },
  tag: {
    accessPoints: [{ url: 'http://accessPoint/tag/service1' }, { url: 'http://accessPoint/tag/service2' }],
  },
};

export const workspaceEnvs$ = from([
  { envKey: 'tag', env: environments.tag },
  { envKey: 'master', env: environments.master },
  { envKey: 'develop', env: environments.develop },
]);
