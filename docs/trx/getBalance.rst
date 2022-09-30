getBalance
===========

Get the account's balance of TRX, and display the TRX balance in SUN

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getBalance(address);

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
  >tronWeb.trx.getBalance('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ').then(console.log)
  >29887074430

  //Parameter HexString
  >tronWeb.trx.getBalance('41BF97A54F4B829C4E9253B26024B1829E1A3B1120').then(console.log)
  >29340074430
