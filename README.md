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

## Setup for bulk query, upload and delete

Querying, uploading and deleting Salesforce records in bulk can be done using the Salesforce DX CLI (sfdx cli). [Install sfdx cli here](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm).

The package will authorise your org using a private key and a self-signed digital certificate. [This page contains instructions on how to generate a private key and a digital certificate using OpenSSL](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_key_and_cert.htm).

Ensure that you have a connected app for your dev hub org and that you have uploaded your digital certificate to it. [More instructions on setting up a connected app for JWT bearer flow here](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm).

## Authorise an org using the JWT bearer flow

```
const SfdxService = require('salesforce-service').SfdxService;

const service = new SfdxService('my-domain');
await service.authorise({
  clientid: '12345',
  keyfilePath: './path/to/server.key',
  username: 'authorisedSfUser@mail.com'
});
```

## Log out from an authorised org

```
await service.logout({
  username: 'authorisedSfUser@mail.com',
  noprompt: true
});
```

## Upsert records

```
service.createNewGenerator('Account', () => { return {Name: 'random name'} }, ['Name']);
await service.generateAndUpsert('Account', 5, {
  externalid: 'Id',
  csvFilePath: './path/to/records.csv',
  sobjectType: 'Account',
  wait: '2'
});
```

## Query records

```
const results = await service.queryAndProcess(`SELECT Id FROM Account WHERE Name='random name'`, './path/to/query/results.csv');
```

## Delete records

```
const results = await service.deleteFromQuery(`SELECT Id FROM Account WHERE Name='random name'`, {
  csvFilePath: './path/to/deleted/records.csv',
  sobjectType: 'Account'
});
```