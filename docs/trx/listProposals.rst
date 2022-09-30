listProposals
===========

Query all the proposals.

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.listProposals();

--------------
Parameters
--------------

N/A

-------
Returns
-------

Object array

-------
Example
-------

.. code-block:: javascript

  > tronWeb.trx.listProposals().then(result => {console.log(result)});
  > [
    {
      proposal_id: 28,
      proposer_address: '414d1ef8673f916debb7e2515a8f3ecaf2611034aa',
      parameters: [ [Object] ],
      expiration_time: 1572955200000,
      create_time: 1572682965000,
      approvals: [
        '414d1ef8673f916debb7e2515a8f3ecaf2611034aa',
        '41de9c3c2276abe2da70a7cdb34a205ecf7750d063',
        '41d25855804e4e65de904faf3ac74b0bdfc53fac76',
        '4184399fc6a98edc11a6efb146e86a3e153d0a0933',
        '4124443254e2d1f3e1f55521d518bd875138f4173c',
        '41496e85711fa3b7ba5a093af635269a67230ac2c1',
        '4167e39013be3cdd3814bed152d7439fb5b6791409',
        '411103d62d8299e90fa011b4ce7fc6ba151e5f1a23',
        '41c189fa6fc9ed7a3580c3fe291915d5c6a6259be7',
        '4178c842ee63b253f8f0d2955bbc582c661a078c9d',
        '4192c5d96c3b847268f4cb3e33b87ecfc67b5ce3de'
      ],
      state: 'DISAPPROVED'
    },
    {
      proposal_id: 27,
      proposer_address: '41d376d829440505ea13c9d1c455317d51b62e4ab6',
      parameters: [ [Object], [Object] ],
      expiration_time: 1572933600000,
      create_time: 1572673746000,
      approvals: [
        '41d376d829440505ea13c9d1c455317d51b62e4ab6',
        '41de9c3c2276abe2da70a7cdb34a205ecf7750d063',
        '41a4475dbd14feb2221f303fc33dc8d0a08f25f445',
        '4184399fc6a98edc11a6efb146e86a3e153d0a0933',
        '4167e39013be3cdd3814bed152d7439fb5b6791409',
        '4124443254e2d1f3e1f55521d518bd875138f4173c',
        '41496e85711fa3b7ba5a093af635269a67230ac2c1',
        '411103d62d8299e90fa011b4ce7fc6ba151e5f1a23',
        '41c189fa6fc9ed7a3580c3fe291915d5c6a6259be7',
        '4178c842ee63b253f8f0d2955bbc582c661a078c9d',
        '415863f6091b8e71766da808b1dd3159790f61de7d',
        '414d1ef8673f916debb7e2515a8f3ecaf2611034aa',
        '41d25855804e4e65de904faf3ac74b0bdfc53fac76',
        '4138e3e3a163163db1f6cfceca1d1c64594dd1f0ca',
        '41b3eec71481e8864f0fc1f601b836b74c40548287',
        '41f29f57614a6b201729473c837e1d2879e9f90b8e',
        '41bac7378c4265ad2739772337682183b8864f517a',
        '4118e2e1c6cdf4b74b7c1eb84682e503213a174955',
        '41e40302d6b5e889bfbd395ed884638d7f03ee3f87',
        '41c81107148e5fa4b4a2edf3d5354db6c6be5b5549',
        '418a445facc2aa94d72292ebbcb2a611e9fd8a6c6e',
        '41c05142fd1ca1e03688a43585096866ae658f2cb2',
        '412d7bdb9846499a2e5e6c5a7e6fb05731c83107c7',
        '4192c5d96c3b847268f4cb3e33b87ecfc67b5ce3de'
      ],
      state: 'APPROVED'
    },
      ... //more items
