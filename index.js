'use strict';

module.exports = {
  name: require('./package').name,

  contentFor: function(type) {
    if (type === 'body') {
      return `
        <script src="https://c.la1-c2cs-cdg.salesforceliveagent.com/content/g/js/44.0/deployment.js" defer></script>
      `;
    }
  }
};
