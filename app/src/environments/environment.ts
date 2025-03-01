// Copyright 2022 Touca, Inc. Subject to Apache-2.0 License.

export const environment = {
  apiUrl: 'http://localhost:8081',
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  appVersion: `${require('../../package.json').version as string}-dev`,
  dataRefreshInterval: 10000,
  google_api_client_id: '',
  self_hosted: true,
  production: false
};
