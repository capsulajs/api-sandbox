import { methods } from '../helpers/mocks';

describe('Methods test suite', () => {
  let apiSandbox: APISandbox;

  beforeEach(() => {
    localStorage.clear();
    apiSandbox = new APISandbox();
    // see how to register some methods here
  });

  it('methods$ should return all available service methods in the selected environment', async (done) => {
    const receivedMethods: any = [];
    const expectedMethods = [methods.create, methods.delete, methods.read, methods.update];
    await apiSandbox.selectEnv({ envName: 'test' });
    apiSandbox.methods$({}).subscribe(
      (data) => receivedMethods.push(data),
      (err) => console.log(err),
      () => {
        expect(receivedMethods).toHaveLength(4);
        expect(receivedMethods).toEqual(expect.arrayContaining(expectedMethods));
        done();
      }
    );
  });

  it('selectMethod should select the provided service method', async () => {
    await apiSandbox.selectMethod({ serviceName: 'serviceTest', methodName: 'create' });
    apiSandbox.selectedMethod$({}).subscribe((method) => expect(method).toEqual(method.create));
  });

  it('Call selectMethod with the name of a non existing service', () => {
    expect(async () => await apiSandbox.selectMethod({ serviceName: 'random', methodName: 'create' })).toThrow(
      new Error('some relevant error about non existing service')
    );
  });

  it('Call selectMethod with the name of a non existing method', () => {
    expect(async () => await apiSandbox.selectMethod({ serviceName: 'serviceTest', methodName: 'random' })).toThrow(
      new Error('some relevant error about non existing method')
    );
  });

  it('Call selectMethod with invalid serviceName', () => {
    const badServiceName = [null, undefined, 123, [], ['test'], {}, { test: 'test' }];
    badServiceName.forEach((name) => {
      apiSandbox
        .selectMethod({ serviceName: name, methodName: 'name' })
        .catch((err: Error) => expect(err).toEqual(new Error('some relevant error')));
    });
  });

  it('Call selectMethod with invalid methodName', () => {
    const badMethodName = [null, undefined, 123, [], ['test'], {}, { test: 'test' }];
    badMethodName.forEach((name) => {
      apiSandbox
        .selectMethod({ serviceName: 'name', methodName: name })
        .catch((err: Error) => expect(err).toEqual(new Error('some relevant error')));
    });
  });

  it('selectedMethod$ returns the currently selected service method', async (done) => {
    let updates = 0;
    apiSandbox.selectedEnv$({}).subscribe((env: any) => {
      updates = updates + 1;
      switch (updates) {
        case 1:
          expect(env).toEqual(methods.delete);
          break;
        case 2:
          expect(env).toEqual(methods.create);
          break;
        case 3:
          expect(env).toEqual(methods.read);
          done();
          break;
      }
    });
    await apiSandbox.selectEnv({ serviceName: 'serviceTest', methodName: 'delete' });
    await apiSandbox.selectEnv({ serviceName: 'serviceTest', methodName: 'create' });
    await apiSandbox.selectEnv({ serviceName: 'serviceTest', methodName: 'read' });
  });
});
