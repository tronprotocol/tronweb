getUnconfirmedBalance
===========

Query unconfirmed balance

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getUnconfirmedBalance(address);

--------------
Parameters
--------------

String(HexString or Base58)

-------
Returns
-------

Number

-------
Example
-------

.. code-block:: javascript

  //Parameter Base58
  >tronWeb.trx.getUnconfirmedBalance('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ').then(result=>console.log(result))
  >29340074430
          
  //Parameter HexString
  >tronWeb.trx.getUnconfirmedBalance('41BF97A54F4B829C4E9253B26024B1829E1A3B1120').then(result=>console.log(result))
  >29340074430
