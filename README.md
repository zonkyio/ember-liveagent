ember-liveagent
==============================================================================

Easily add Salesforce's LifeAgent to your app.

Installation
------------------------------------------------------------------------------

```
ember install ember-liveagent --s
```


Usage
------------------------------------------------------------------------------

First you'll need to configure your liveagent:

```javascript
// config/environment.js

ENV['ember-liveagent'] = {
  host: '[YOUR_CHAT_URL]',
  id: '[YOUR_CHAT_ID]',
  org: '[YOUR_CHAT_ORG]',
  buttonId: '[YOUR_CHAT_BUTTON_ID]'
};
```

Then, once a user has authenticated, you will need to boot liveagent. You can inject the `liveagent` service provided by this addon into a `route/component/service/whatever` and call the boot method:

```javascript
this.get('liveagent').init({
  name: '[YOUR_USERS_NAME]',
  email: '[YOUR_USERS_EMAIL]'
});
```


Create liveagent button component:

```javascript
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  liveagent: service(),

  didRender() {
    this._super(...arguments);
    this.liveagentInit();
  },

  actions: {
    startChat() {
      this.liveagent.startChat();
    },
  },

  liveagentInit() {
    const onlineSelector = 'liveagent_button_online';
    const offlineSelector = 'liveagent_button_offline';

    const buttonCallback = e => {
      const onlineButton = document.getElementById(onlineSelector);
      const offlineButton = document.getElementById(offlineSelector);
      if (
        e === window.liveagent.BUTTON_EVENT.BUTTON_ACCEPTED ||
        e === window.liveagent.BUTTON_EVENT.BUTTON_UNAVAILABLE
      ) {
        offlineButton.style.display = 'unset';
        onlineButton.style.display = 'none';
      } else {
        offlineButton.style.display = 'none';
        onlineButton.style.display = 'unset';
      }
    };

    this.liveagent.boot(onlineSelector, offlineSelector, buttonCallback);
    this.liveagent.init();
  },
});
```

Template for the button component: 

```handlebars
<a
  style="display: none;"
  id="liveagent_button_online"
  href="javascript://Chat"
  onclick={{action "startChat"}}
>
  Start chat
</a>
<div
  style="display: none;"
  id="liveagent_button_offline"
>
  Unavailable
</div>
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-liveagent`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
