import Config from '../Config';

describe(' test configuration loader', () => {
  it('it should load config successfully', () => {
    const config = new Config(process.cwd() + '/src/api/__tests__/__resources__/test.json');
    config.getConfig();
  });
});
