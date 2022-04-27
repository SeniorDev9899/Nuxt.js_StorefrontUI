const { apiClientFactory } = require("@vue-storefront/core");

const onCreate = (settings) => {
  return {
    config: settings,
    client: {},
  };
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api: {},
});

module.exports = { createApiClient };
