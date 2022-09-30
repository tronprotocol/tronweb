_signTypedData
==============

Sign the typed data value with types data structure for domain using the `TIP-712 specification <https://github.com/tronprotocol/tips/issues/443>`_.

.. warning:: 
  Experimental feature (this method name will change)

  This is still an experimental feature. If using it, please specify the exact version of tronweb you are using (e.g. specify "4.3.0", not "^4.3.0") as the method name will be renamed from _signTypedData to signTypedData once it has been used in the field a bit.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx._signTypedData( domain, types, value, privateKey);

--------------
Parameters
--------------

=============== ======================================================================================================================================== ===========
Parameter       Description                                                                                                                              Data Type
=============== ======================================================================================================================================== ===========
domain          Domain separator. This field is to prevent collisions with other transactions on the network or messages with the same structure.        JSON
types           Type definition of Typed Data	                                                                                                           JSON
value           The value of Typed Data	                                                                                                                 JSON
privateKey      The private key used for signing. Optional. The default value is the private key passed in when constructing tronweb object.             String
=============== ======================================================================================================================================== ===========

-------
Returns
-------

String - Signature to the typed data

-------
Example
-------

.. code-block:: javascript

  // All properties on a domain are optional
  const domain = {
    name: 'TRON Mail',
    version: '1',
    chainId: '0x2b6653dc',
    verifyingContract: 'TUe6BwpA7sVTDKaJQoia7FWZpC9sK8WM2t'
  };

  // The named list of all type definitions
  const types = {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' }
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' }
    ]
  };

  // The data to sign
  const value = {
    from: {
      name: 'Cow',
      wallet: 'TUg28KYvCXWW81EqMUeZvCZmZw2BChk1HQ'
    },
    to: {
      name: 'Bob',
      wallet: 'TT5rFsXYCrnzdE2q1WdR9F2SuVY59A4hoM'
    },
    contents: 'Hello, Bob!'
  };

  const signature = await tronWeb.trx._signTypedData(domain, types, value);
  // signing result: 0x72cc671f38be492773e2cd44c64535ab8825d8ab7b0e580ee45731d00fc0aa5a385bf816505e6c53864bc8539677f7c6a6ece907c94e02d473d392e364cfd5691c
