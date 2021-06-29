Object.defineProperty(exports, '__esModule', { value: true });
const azure_func_http_1 = require('@nestjs/azure-func-http');
const main_azure_1 = require('../src/main');
function default_1(context) {
  context = {
    ...context,
    req: {
      method: 'GET',
      originalUrl: 'http://localhost/api/create-image-video',
      body: context.bindingData.data,
    },
  };

  azure_func_http_1.AzureHttpAdapter.handle(main_azure_1.createApp, context);
}
exports.default = default_1;
