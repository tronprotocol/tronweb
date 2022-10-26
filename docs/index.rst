=================================
tronWeb - TRON JavaScript API
=================================

tronWeb aims to deliver a unified, seamless development experience influenced by Ethereum's `Web3 <https://github.com/ethereum/web3.js/>`_ implementation. We have taken the core ideas and expanded upon it to unlock the functionality of TRON's unique feature set along with offering new tools for integrating DApps in the browser, Node.js and IoT devices.

:ref:`tronWeb` is created as an instance object with utility functions that allows you to interact with `Tron Network <tron.network>`_ to build Dapps.  

:ref:`tronWeb-trx` provides access to on-chain information including account, block, transaction using tronWeb.fullNode

:ref:`tronWeb-transactionBuilder` enables you to create transactions which can be signed later.

:ref:`tronWeb-contract` allows you to deploy smart contracts to the tron network and execute its methods

:ref:`tronWeb-utils` consists utility functions including encode/decode parameters to/from ABI, type casting, type comparing, value validating, etc.

.. toctree::
   :maxdepth: 2
   :caption: API Reference

   installation
   tronWeb
   tronWeb-trx
   tronWeb-transactionBuilder
   tronWeb-contract
   tronWeb-utils