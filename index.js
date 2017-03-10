'use strict';

import Strophe from "strophe.js";
import $ from "jquery";

var strophe = Strophe.Strophe
var $pres = Strophe.$pres;
var $msg = Strophe.$msg;
var roster = null;


// var server = "https://jabberpl.org/http-bind/";
var server = 'http://localhost:8000/http-bind/'
var username = "user1@pontarius"
var password = "pwd1"
var connection = null;

function log(msg){
    $('#log').append('<div></div>').append(document.createTextNode(msg));
}

// function onPresenceSubscribe(pre) {

// }


function handleRoster() {
  let requestRoster = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
  connection.sendIQ(requestRoster, function(res) {
    let child = res.
                                  }
                   )

}


function onPresence(presence) {
  let type = presence.getAttribute('type');
  let from = presence.getAttribute('from');
  if (type == "subscribe") {
    log('User ' + from + ' requested subscription')
    connection.send($pres({ to: from
                          , type: "subscribed"}))
    connection.send($pres({ to: from
                          , type: "subscribe"}))
  }
  return true;

}

function onMessage(msg) {
  let to = msg.getAttribute("to");
  let from = msg.getAttribute("from");
  let type = msg.getAttribute("type");
  let elems = msg.getElementsByTagName("body");

  if (type == "chat" && elems.length > 0) {
    var body = elems[0];
	log('ECHOBOT: I got a message from ' + from + ': ' +
	    strophe.getText(body));
        console.log(typeof'msg');
	var reply = $msg({to: from})
            .cnode(strophe.copyElement(body));
	connection.send(reply.tree());
	log('ECHOBOT: I sent ' + from + ': ' + strophe.getText(body));
    }
  return true;

}

function onConnect(status)
{
    if (status == strophe.Status.CONNECTING) {
	log('strophe is connecting.');
    } else if (status == strophe.Status.CONNFAIL) {
	log('strophe failed to connect.');
	$('#connect').get(0).value = 'connect';
    } else if (status == strophe.Status.DISCONNECTING) {
	log('strophe is disconnecting.');
    } else if (status == strophe.Status.DISCONNECTED) {
	log('strophe is disconnected.');
	$('#connect').get(0).value = 'connect';
    } else if (status == strophe.Status.CONNECTED) {
	log('strophe is connected.');
	log('ECHOBOT: Send a message to ' + connection.jid +
	    ' to talk to me.');

	connection.addHandler(onMessage, null, 'message', null, null,  null);
	connection.addHandler(onPresence, null, 'presence', null, null,  null);
	connection.send($pres().tree());
    } else  {
      log("unknown status" + status)
    }
}



$(document).ready( function(){
  $('#jid').get(0).value = username;
  $('#password').get(0).value = password;
  // strophe.log = function(level, msg) { log(level + " " + msg); };
  connection = new strophe.Connection(server);
  log("Hello world");
  $('#connect').bind('click', function () {
	let button = $('#connect').get(0);
	if (button.value == 'connect') {
	    button.value = 'disconnect';
            let usr = $('#jid').get(0).value;
            let pwd = $('#password').get(0).value;
            log("connecting with " + usr + " " + pwd);
	    connection.connect( usr, pwd, onConnect);
	} else {
	    button.value = 'connect';
	    connection.disconnect();
	}
  });
})