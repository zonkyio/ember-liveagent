'use strict';

module.exports = {
  name: require('./package').name,

  contentFor: function(type) {
    if (type === 'body') {
      return `
        <script src="https://service.force.com/embeddedservice/5.0/esw.min.js" defer></script>
      `;
    }
  }
};
