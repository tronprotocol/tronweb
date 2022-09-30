setPrivateKey
===============

Set a private key used with the TronWeb instance, used for obtaining the address, signing transactions, and getting balances.

.. warning:: 
  Do not use this with any web/user facing TronWeb instances. This will leak the private key.

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.setPrivateKey('da146...f0d0');

--------------
Parameters
--------------

String

-------
Returns
-------

No return value

-------
Example
-------

.. code-block:: javascript

  >tronWeb.setPrivateKey('AD71C52E0FC0AB0DFB13B3B911624D4C1AB7BDEFAD93F36B6EF97DC955577509');
  undefined
  > tronWeb.defaultPrivateKey
  'AD71C52E0FC0AB0DFB13B3B911624D4C1AB7BDEFAD93F36B6EF97DC955577509'