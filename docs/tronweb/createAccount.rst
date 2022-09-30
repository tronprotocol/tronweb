createAccount
===============

Generate a new privatekey + address combination. This account is not activated on the network.

.. warning::
  This API exposes the private key for the new address. Do not use this in any unsafe environments.


-------
Usage
-------

.. code-block:: javascript
  
  tronWeb.createAccount()

--------------
Parameters
--------------

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  tronWeb.createAccount()
  >address: {
    base58: "TPbBpRXnt6ztse8XkCLiJstZyqQZvxW2sx", 
    hex: "4195679F3AAF5211991781D49B30525DDDFE9A18DE"}
  privateKey: "08089C24EC3BAEB34254DDF5297CF8FBB8E031496FF67B4EFACA738FF9EBD455"
  publicKey:  "04EE63599802B5D31A29C95CC7DF04F427E8F0A124BED9333F3A80404ACFC3127659C540D0162DEDB81AC5F74B2DEB4962656EFE112B252E54AC3BA1207CD1FB10"
  __proto__: Object