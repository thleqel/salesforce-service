import Config from '../Config';

describe(' test configuration loader', () => {
  it('it should load config file successfully', () => {
    const config = new Config(process.cwd() + '/src/api/__tests__/__resources__/test.json');
    config.getConfig();
    expect(config).not.toBeNull();
  });

  it('it should load config JSON successfully', () => {
    const configuration = <JSON>(<any>{
      urls: {
        testUrl: 'https://test.salesforce.com',
        baseUrl: 'https://test.salesforce.com',
        domain: 'private217-dev-ed.my.salesforce.com',
      },
      paths: {
        soap: '/services/Soap/u/51.0',
        data: '/services/data/v51.0',
        query: '/services/data/v51.0/query/?q=',
      },
    });
    const config = new Config(configuration);
    expect(config).not.toBeNull();
  });
});
