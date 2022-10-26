==================
Installation
==================

------------------------------------------------------------------------------

Installation
==================

-------
Node.js
-------

.. code-block:: javascript

  npm install tronweb

or 

.. code-block:: javascript

  yarn add tronweb


-------
Browser
-------

First, don't use the release section of this repo, it has not updated in a long time.

Then easiest way to use TronWeb in a browser is to install it as above and copy the dist file to your working folder. For example:

.. code-block:: javascript

  cp node_modules/tronweb/dist/TronWeb.js ./js/tronweb.js

so that you can call it in your HTML page as

.. code-block:: javascript

  <script src="./js/tronweb.js"><script>

Create TronWeb Instance
==================

In order to use tronWeb in your application, you need to create a tronWeb instance like the following.

**Create a tronWeb instance without sidechain options**

.. code-block:: javascript

  const TronWeb = require('tronweb')
  const HttpProvider = TronWeb.providers.HttpProvider;
  let fullNode = '';
  let solidityNode = '';
  let eventServer = '';
  const privateKey = '';
  const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

**Create a tronWeb instance with sidechain options**

.. code-block:: javascript

  const TronWeb = require('tronweb');
  let fullNode = '';
  let solidityNode = '';
  let eventServer = '';
  let sideOptions = {
    fullNode: '',
    solidityNode: '',
    eventServer: '',
    mainGatewayAddress: '',
    sideGatewayAddress: '',
    sideChainId: ''
  }
  const privateKey = '';
  const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,sideOptions,privateKey);\


