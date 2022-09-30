isConnected
============

Checks if TronWeb is connected to the nodes and event server.

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.isConnected()

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.isConnected();
  > …
  >[[PromiseStatus]]: "resolved"
  [[PromiseValue]]: Object
  fullNode: true
  solidityNode: true
  eventServer: true
  ...