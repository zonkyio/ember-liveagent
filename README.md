# ember-liveagent

[![Actions Status](https://github.com/zonkyio/ember-liveagent/workflows/CI/badge.svg)](https://github.com/zonkyio/ember-liveagent/actions)
[![Ember Observer Score](https://emberobserver.com/badges/ember-liveagent.svg)](https://emberobserver.com/addons/ember-liveagent)
[![Maintainability](https://api.codeclimate.com/v1/badges/1f036b2befff3579f2f7/maintainability)](https://codeclimate.com/github/zonkyio/ember-liveagent/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1f036b2befff3579f2f7/test_coverage)](https://codeclimate.com/github/zonkyio/ember-liveagent/test_coverage)
[![dependencies Status](https://david-dm.org/zonkyio/ember-liveagent/status.svg)](https://david-dm.org/zonkyio/ember-liveagent)
[![devDependencies Status](https://david-dm.org/zonkyio/ember-liveagent/dev-status.svg)](https://david-dm.org/zonkyio/ember-liveagent?type=dev)

Salesforce's [live agent](https://www.salesforce.com/products/service-cloud/features/live-agent/) chat integration for Ember.js applications.

## Compatibility

- Ember.js v3.24 or above
- Ember CLI v3.24 or above
- Node.js v12 or above

## Installation

```
ember install ember-liveagent
```

## Usage

1\. You'll need to configure your `liveagent` chat.

```javascript
// config/environment.js
module.exports = function (environment) {
  let ENV = {
    'ember-liveagent': {
      salesforceURL: '[SALESFORCE_URL]',
      communityURL: '[COMMUNITY_URL]',
      org: '[ORG]',
      snapinName: '[SNAPIN_NAME]',
      baseLiveAgentContentURL: '[BASE_LIVEAGENT_CONTENT_URL]',
      deploymentId: '[DEPLOYMENT_ID]',
      buttonId: '[BUTTON_ID]',
      baseLiveAgentURL: '[BASE_LIVEAGENT_URL]',
      eswLiveAgentDevName: '[ESW_LIVEAGENT_DEV_NAME]',
    },
  };

  return ENV;
};
```

_See the [service](addon/services/liveagent.js) for how the parameters are passed into `embedded_svc`'s `init` method._

2\. You can then inject the `liveagent` service provided by this addon to call the `boot` method which accepts optional parameters.

```javascript
// app/routes/application.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service liveagent;

  afterModel() {
    this.liveagent.boot({
      displayHelpButton: true, // default value: false
      isOfflineSupportEnabled: true, // default value: false
      language: 'cs', // default value: 'en'
      defaultMinimizedText: 'Ask guru', // default value: 'Chat with an Expert'
      loadingText: 'Just wait a second', // default value: 'Loading'
      prepopulatedPrechatFields: { Email: 'example@example.com' }, // default value: {}
      offlineSupportMinimizedText: 'You can contact us', // default value: 'Contact Us'
    });
  }
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
