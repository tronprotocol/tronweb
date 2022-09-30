verifyMessage
=============

verify signature of a hex formatted string

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.verifyMessage(hexMsg, signedMsg, address)

--------------
Parameters
--------------
============ ================================ ===========
Parameter    Description                      Data Type
============ ================================ ===========
hexMsg       hex formatted string             String
signedMsg    signature of the string          String
address      signature address(base58 or hex) String
============ ================================ ===========

-------
Returns
-------

bool - true if verify successfully, else return error

-------
Example
-------

.. code-block:: javascript

  // sign a string message
  var str = "helloworld"; 
  // convert to hex format and remove the beginning "0x"
  var hexStrWithout0x = tronWeb.toHex(str).replace(/^0x/, '');
  // conert hex string to byte array
  var byteArray = tronWeb.utils.code.hexStr2byteArray(hexStrWithout0x)
  // keccak256 computing, then remove "0x" 
  var strHash= tronWeb.sha3(byteArray).replace(/^0x/, '');
  // sign 
  var signedStr = await tronWeb.trx.sign(strHash);
  var tail = signedStr.substring(128, 130);
  if(tail == '01')
  {
      signedStr = signedStr.substring(0,128)+'1c';
  }
  else if(tail == '00')
  {
      signedStr = signedStr.substring(0,128)+'1b';
  }


  // verify the signature
  var res = await tronWeb.trx.verifyMessage(strHash,signedStr,'TPNcZ1j55FrGpsaw6K6rVjuL4HfT8ZbBf7')
  console.log(res);
  >true
