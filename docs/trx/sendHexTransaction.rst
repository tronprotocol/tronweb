sendHexTransaction
===========

Broadcast the protobuf encoded transaction hex string after sign

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.sendHexTransaction(signedHexTransaction);

--------------
Parameters
--------------

===================== ====================================================== ============
Parameter             Description	                                           Data Type
===================== ====================================================== ============
signedHexTransaction  The protobuf encoded transaction hex after sign	       Hex String
===================== ====================================================== ============

-------
Returns
-------

N/A

-------
Example
-------

.. code-block:: javascript

  const receipt = await tronWeb.trx.sendHexTransaction("0A8A010A0202DB2208C89D4811359A28004098A4E0A6B52D5A730802126F0A32747970652E676F6F676C65617069732E636F6D2F70726F746F636F6C2E5472616E736665724173736574436F6E747261637412390A07313030303030311215415A523B449890854C8FC460AB602DF9F31FE4293F1A15416B0580DA195542DDABE288FEC436C7D5AF769D24206412418BF3F2E492ED443607910EA9EF0A7EF79728DAAAAC0EE2BA6CB87DA38366DF9AC4ADE54B2912C1DEB0EE6666B86A07A6C7DF68F1F9DA171EEE6A370B3CA9CBBB00");
