setAddress
===========

Sets the address used with all TronWeb API's. Will not sign any transactions.

-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.setAddress();

--------------
Parameters
--------------

String(HexString or Base58)

-------
Returns
-------

No return value

-------
Example
-------

.. code-block:: javascript

  //example 1
  >tronWeb.setAddress('TVJ6njG5EpUwJt4N9xjTrqU5za78cgadS2');
  …
  >tronWeb.defaultAddress
  {
    hex: '41d3fd1b6f3f3a86303e2925844456c49876c4561f',
    base58: 'TVJ6njG5EpUwJt4N9xjTrqU5za78cgadS2'
  }

  //example 2
  >tronWeb.setAddress('41d3fd1b6f3f3a86303e2925844456c49876c4561f');
  …
  >tronWeb.defaultAddress
  {
    hex: '41d3fd1b6f3f3a86303e2925844456c49876c4561f',
    base58: 'TVJ6njG5EpUwJt4N9xjTrqU5za78cgadS2'
  }
  