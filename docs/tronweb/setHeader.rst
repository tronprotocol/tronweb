setHeader
==========

Set the API Key parameters of all TronWeb API requests

.. note:: 
  It needs to be set only when using the Trongrid service. For API Key parameter application and use, please refer to `document <https://developers.tron.network/reference/api-key>`__.

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.setHeader({"TRON-PRO-API-KEY": 'your api key'});

--------------
Parameters
--------------

Object

-------
Returns
-------

No return value

-------
Example
-------

.. code-block:: javascript

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey)
  tronWeb.setHeader({ "TRON-PRO-API-KEY": '25f66928-0b70-48cd-9ac6-da6f8247c663' });
