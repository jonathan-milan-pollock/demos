Object.defineProperty(exports, '__esModule', { value: true });
const azure_func_http_1 = require('@nestjs/azure-func-http');
const main_azure_1 = require('../src/main');
function default_1(context, req) {
  azure_func_http_1.AzureHttpAdapter.handle(
    main_azure_1.createApp,
    context,
    req
  );
}
exports.default = default_1;
