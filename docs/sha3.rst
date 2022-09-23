sha3
=====

Helper function that will sha3 any value using keccak256

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.sha3()

--------------
Parameters
--------------

1.String - The string that needs to be hashed using Keccak-256 SHA3 algorithm.

2.Object - Optional setting. If you want to parse a hex string in hex format. Need to set encoding to hex. Because 0x is ignored by default in JS.

-------
Returns
-------

String

-------
Example
-------

.. code-block:: javascript

  var hash = tronWeb.sha3("some string to be hashed");
  console.log(hash)
  >0xc4b9bbe7eb8797cf2818085dbcd6ea6662b3261c28810c318e079c8d0c691da6
  var hashOfHash = tronWeb.sha3(hash, {encoding:'hex'})
  console.log(hashOfHash)
  >0xc4b9bbe7eb8797cf2818085dbcd6ea6662b3261c28810c318e079c8d0c691da6