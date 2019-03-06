import APISandbox from '../../src/APISandbox';
import { environments } from '../helpers/envsMock';
import Workspace from '../helpers/workspaceMock';
import { Env } from '../../src/api/Env';

describe('Environments test suite', () => {
  let apiSandbox: APISandbox;

  beforeEach(async () => {
    (window as any).workspace = new Workspace({ emptyEnv: false });
    apiSandbox = new APISandbox();
  });

  it('environments$ should return all available environments', async (done) => {
    expect.assertions(2);
    const receivedEnvs: any = [];
    const expectedEnvs = [
      { envKey: 'tag', env: environments.tag },
      { envKey: 'master', env: environments.master },
      { envKey: 'develop', env: environments.develop },
    ];
    apiSandbox.environments$({}).subscribe(
      (data) => receivedEnvs.push(data),
      (err) => new Error(err),
      () => {
        expect(receivedEnvs).toHaveLength(3);
        expect(receivedEnvs).toEqual(expect.arrayContaining(expectedEnvs));
        done();
      }
    );
  });

  it('environments$ when empty workspace', async (done) => {
    expect.assertions(2);
    (window as any).workspace = new Workspace({ emptyEnv: true });
    const receivedEnvs: any = [];
    const expectedEnvs: any = [];
    apiSandbox.environments$({}).subscribe(
      (data) => receivedEnvs.push(data),
      (err) => new Error(err),
      () => {
        expect(receivedEnvs).toHaveLength(0);
        expect(receivedEnvs).toEqual(expect.arrayContaining(expectedEnvs));
        done();
      }
    );
  });

  it('selectEnv should select the provided environment', async (done) => {
    expect.assertions(1);
    await apiSandbox.selectEnv({ envKey: 'develop' });
    apiSandbox.selectedEnv$({}).subscribe((env) => {
      expect(env).toEqual({ envKey: 'develop', env: environments.develop });
      done();
    });
  });

  it('Call selectEnv with the name of a non existing environment', async () => {
    expect.assertions(1);
    await expect(apiSandbox.selectEnv({ envKey: 'non-existing-env-name' })).rejects.toEqual(
      new Error('There is no available environment with this envKey')
    );
  });

  it('Call selectEnv with already selected environment', async () => {
    expect.assertions(1);
    await apiSandbox.selectEnv({ envKey: 'tag' });
    await expect(apiSandbox.selectEnv({ envKey: 'tag' })).rejects.toEqual(
      new Error('This environment is already selected')
    );
  });

  it('Call selectEnv with invalid environment name', () => {
    expect.assertions(7);
    const badEnvKeyValues = [null, undefined, 123, [], ['test'], {}, { test: 'test' }];
    badEnvKeyValues.forEach((key) => {
      apiSandbox
        // @ts-ignore
        .selectEnv({ envKey: key })
        .catch((err: Error) => expect(err).toEqual(new Error('envKey was not provided or is not a string')));
    });
  });

  it('selectedEnv$ returns the currently selected environment', async (done) => {
    expect.assertions(3);
    let updates = 1;
    apiSandbox.selectedEnv$({}).subscribe((env: Env) => {
      switch (updates) {
        case 1:
          expect(env).toEqual({ envKey: 'develop', env: environments.develop });
          break;
        case 2:
          expect(env).toEqual({ envKey: 'master', env: environments.master });
          break;
        case 3:
          expect(env).toEqual({ envKey: 'tag', env: environments.tag });
          done();
          break;
        default:
          break;
      }
      updates = updates + 1;
    });
    await apiSandbox.selectEnv({ envKey: 'develop' });
    await apiSandbox.selectEnv({ envKey: 'master' });
    await apiSandbox.selectEnv({ envKey: 'tag' });
  });

  it('selectedEnv$ ', async (done) => {
    expect.assertions(3);
    await apiSandbox.selectEnv({ envKey: 'develop' });
    let updates = 1;
    apiSandbox.selectedEnv$({}).subscribe((env: Env) => {
      switch (updates) {
        case 1:
          expect(env).toEqual({ envKey: 'develop', env: environments.develop });
          break;
        case 2:
          expect(env).toEqual({ envKey: 'master', env: environments.master });
          break;
        case 3:
          expect(env).toEqual({ envKey: 'tag', env: environments.tag });
          done();
          break;
        default:
          break;
      }
      updates = updates + 1;
    });
    await apiSandbox.selectEnv({ envKey: 'master' });
    await apiSandbox.selectEnv({ envKey: 'tag' });
  });
});
