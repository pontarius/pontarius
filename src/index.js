'use strict';

import $ from 'jquery';
import createPontarius from 'pontarius';

import {Strophe, $msg} from 'strophe.js';

const server = 'http://localhost:8000/http-bind/';
const username = 'user1@pontarius';
const password = 'pwd1';

const credentials = {server, jid:username, password};

const them = 'user2@pontarius';

let connection = null;

function log(msg) {
  $('#log').append('<div></div>').append(document.createTextNode(msg));
}

/**
 * Describe Strophe status code
 * @function
 * @param {number} status: Status code to describe
 * @return {string}: Description of the status code
 */
function describeStatus(status) {
  switch (status) {
  case Strophe.Status.CONNECTING:
    return 'connecting';
  case Strophe.Status.CONNFAIL:
    return 'connection failed';
  case Strophe.Status.DISCONNECTING:
    return 'disconnecting';
  case Strophe.Status.DISCONNECTED:
    return 'disconnected';
  case Strophe.Status.CONNECTED:
    return 'connected';
  default:
    return 'unknown status: ' + status;
  }
}


const callbacks = {
  statusCallback: function(status) {
    log('status: ' + describeStatus(status));
  },
  messageCallback: function(message) {
    log('message: '+ message);
  },
  log: log
};


$(document).ready( function() {
  log($msg == undefined);
  let pontarius = createPontarius(credentials, callbacks);
  // strophe.log = function(level, msg) { log(level + ' ' + msg); };
});
