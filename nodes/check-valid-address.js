/* 
File:               check-valid-address.js
Author:             Gazos <gazos@xrpi.io>
Date:               02/04/19
Last Modified Date: 28/05/19
Last Modified By:   Gazos <gazos@xrpi.io>
*/

// Import Dependencies
const XRPLib = require('../lib/xrp');

module.exports = function(RED) {
    "use strict";

    // The main node definition - most things happen in here
    function CheckValidAddress(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;
        // create a msg object
        var msg = {};

        // when an input is recieved
        this.on('input', function (msg) {
          try {
            var address = null;
            if (n.address != "")
              address = n.address;
            else
              address = msg.payload.address;
            // check to see if the address decodes to base 58 and contains a valid XRP characterset.
            msg.payload = XRPLib.isValidAddress(address);
            this.send(msg);
          } catch (e) {
            msg.error = e;
            this.send(msg);
          }
        });

        this.on("close", function() {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: node.client.disconnect();
        });
    }

    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType("check-valid-address", CheckValidAddress);

}
