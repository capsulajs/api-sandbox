describe('Invoke test suite', () => {
  let apiSandbox: APISandbox;

  beforeEach(() => {
    localStorage.clear();
    apiSandbox = new APISandbox();
    // see how to register some methods here
  });
  it('invoke method invokes the currently selected service method', async (done) => {
    let updates = 0;
    await apiSandbox.selectEnv({ envName: 'test' });
    await apiSandbox.selectMethod({ serviceName: 'test', methodName: 'testM1' });
    apiSandbox.logs$({}).subscribe((log) => {
      updates = updates + 1;
      switch (updates) {
        case 1:
          expect(log).toEqual('some log');
          break;
        case 2:
          expect(log).toEqual('some other log');
          done();
          break;
      }
    });
    await apiSandbox.invoke({ data: ['some args'] });
    await apiSandbox.selectMethod({ serviceName: 'test', methodName: 'testM2' });
    await apiSandbox.invoke({ data: ['some other args'] });
  });

  it('Call invoke method with invalid data', () => {
    const badData = [null, undefined, 'test', 123, [], ['test'], {}, { test: 'test' }];
    badData.forEach((data) => {
      apiSandbox.invoke(data).catch((err: Error) => expect(err).toEqual(new Error('some relevant error')));
    });
  });
});
