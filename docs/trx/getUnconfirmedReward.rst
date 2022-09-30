getUnconfirmedReward
===========

Query unconfirmed reward

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getUnconfirmedReward(address)

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
  >tronWeb.trx.getUnconfirmedReward("TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ").then(result=>console.log(result))
  > 0
  
  //Parameter HexString
  >tronWeb.trx.getUnconfirmedReward("41BF97A54F4B829C4E9253B26024B1829E1A3B1120").then(result=>console.log(result))
  > 0
