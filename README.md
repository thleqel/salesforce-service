# salesforce-service

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=thleqel_salesforce-service&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=thleqel_salesforce-service)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=thleqel_salesforce-service&metric=security_rating)](https://sonarcloud.io/dashboard?id=thleqel_salesforce-service)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=thleqel_salesforce-service&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=thleqel_salesforce-service)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=thleqel_salesforce-service&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=thleqel_salesforce-service)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=thleqel_salesforce-service&metric=bugs)](https://sonarcloud.io/dashboard?id=thleqel_salesforce-service)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=thleqel_salesforce-service&metric=code_smells)](https://sonarcloud.io/dashboard?id=thleqel_salesforce-service)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=thleqel_salesforce-service&metric=sqale_index)](https://sonarcloud.io/dashboard?id=thleqel_salesforce-service)

# Introduction

_salesforce-service_ is a wrapper that helps interacting with Salesforce REST and SOAP API easier. This can be very helpful while testing Salesforce application.

# Installation

```
npm install --save-dev salesforce-service
```

# Usages

## Configuration file

Configuration file is a json file in which you can store all relevant information for your Salesforce application. Here is a example:

```
{
  "urls":{
    "testUrl": "https://test.salesforce.com",
    "baseUrl": "https://test.salesforce.com",
    "domain": "your-domain.my.salesforce.com"
  },
  "paths": {
    "soap": "/services/Soap/u/51.0",
    "data": "/services/data/v51.0",
    "query": "/services/data/v51.0/query/?q="
  }
}
```

## Get session information

```
const SfService = require('salesforce-service').SfService;

const service = new SfService({
  configFile: 'config.json'
})

service.getSessionId({
  username: 'youruser',
  password: 'yourpass',
  token:'yourtoken'
}).then((res) => {
  console.log(res)
})
```

## Run a query

```
await service.query('your query command');
```

## Deal with records

```
it('get record successfully', async () => {
    const response = await service.getRecord('123');
    expect(response.data).toEqual('got record');
  });

  it('create record successfully', async () => {
    const data: JSON = JSON.parse('{"field1": "value1"}');
    const response = await service.createRecord('name', data);
    expect(response.data).toEqual('created record');
  });

  it('update record successfully', async () => {
    const data: JSON = JSON.parse('{"field1": "value1"}');
    const response = await service.updateRecord('123', data);
    expect(response.data).toEqual('updated record');
  });

  it('delete record successfully', async () => {
    const response = await service.deleteRecord('123');
    expect(response.data).toEqual('deleted record');
  });
```
