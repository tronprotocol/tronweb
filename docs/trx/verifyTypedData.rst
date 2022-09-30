verifyTypedData
===================

Verify the signature of the typed data value with types data structure for domain using the `TIP-712 specification <https://github.com/tronprotocol/tips/issues/443>`_.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.verifyTypedData(domain, types, value, signature, address);

--------------
Parameters
--------------

=============== ======================================================================================================================================= =============
Parameter	      Description	                                                                                                                            Data Type
=============== ======================================================================================================================================= =============
domain          Domain separator. This field is to prevent collisions with other transactions on the network or messages with the same structure.       JSON
types           Type definition of Typed Data                                                                                                           JSON
value	          The value of Typed Data	                                                                                                                JSON
signature	      Signature to be verified                                                                                                                String
address	        Signed account address (Base58 format or Hex format)                                                                                    String
=============== ======================================================================================================================================= =============

-------
Returns
-------

bool - true if verify successfully, else return error Signature does not match.

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

  const result = await tronWeb.trx.verifyTypedData(domain, types, value, signature);
  // verification result: true
