const changeset_list = require('./commands/changeset_list.js');

(function () {
  'use strict';

  exports.topics = [{
    name: 'changeset',
    description: 'commands for ChangeSets'
  }];

  exports.namespace = {
    name: 'wipd',
    description: 'Various commands from Brett Nelson at WIPDeveloper.com'
  };

  exports.commands = [
    changeset_list,
  ];

}());