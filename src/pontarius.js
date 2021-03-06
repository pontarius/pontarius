'use strict';

import {Strophe, $pres, $msg} from 'strophe.js';
import {} from './strophe.roster';


/*

Roster: Map of JID -> Roster Item

Roster Item:
  * address (JID)
  * name (display name)
  * status (online, offline)

*/


const skip = () => {return;};

/**
 *
 * @param {} test
 */
export default function createPontarius({server, jid, password},
                                        {statusCallback = skip,
                                         messageCallback = skip,
                                         subscribeCallback = skip,
                                         log = skip} = {} ) {
  let connection = new Strophe.Connection(server);
  let items = undefined;

  let _replaceRoster = function(newList, newItem) {
    if (items === undefined) {
      items = new Map();
    } else {
      items.clear();
    }
    newList.forEach((item) => {
      items.set(item.jid, {address: item.jid,
                           name: item.name,
                           status: 'unknown'
                          });
    });
  };

  let _updateRoster = function(newItem, oldItem) {
    if (newItem == undefined) {
      items.delete(oldItem.jid);
    } else {
      items.set(newItem.jid, newItem);
    }
  };

  let _rosterCallback = function(newItems, newItem, oldItem) {
    if(items === undefined) {
      _replaceRoster(newItems);
    } else {
      _updateRoster(newItem, oldItem);
    }
    return true;
  };

  let _statusCallback = function(status) {
    if (status === Strophe.Status.CONNECTED) {
      connection.roster.registerCallback(_rosterCallback);
      connection.roster.registerRequestCallback(subscribeCallback);
      connection.addHandler(messageCallback, null, 'message', null, null,  null);
      connection.roster.get(function() {log('got roster');});
      connection.send($pres().tree());
    }
    // Pass status to user callback
    statusCallback(status);
    return true;
  };


  let authorize = function(address) {
    connection.roster.authorize(address);
  };

  let unauthorized = function(address) {
    connection.roster.unauthorize(address);
  };

  let getRoster = function() {
    return items;
  };

  let sendMessage = function(type, recipient, contents ){
    let msg = $msg({ to: recipient })
               .c(type, {ns: pontariusNS})
               .t(contents);
    connection.send(msg.tree());
  };

  let onMessage = function(type, callback){
    let handler = function(message){
      let nodes = message.getElementsByTagName(type);
      if (nodes.length > 0){
        callback(nodes[0].textContent);
      }
      return true;
    };
    connection.addHandler(handler, undefined, 'message');
  };

  let sendIM = function(recip, message) {
    let msg = $msg({ to: recip,
                     type: 'chat'
                   }. c('body').t(msg)
                  );
  };

  let connect = function() {
    connection.connect(jid, password, _statusCallback);
  };

  return {
    connect,
    getRoster,
    sendMessage,
    onMessage,
    sendIM,
    authorize,
    unauthorized
  };
}
