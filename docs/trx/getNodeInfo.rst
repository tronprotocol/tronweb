getNodeInfo
===========

Get the node info

-------
Usage
-------

.. code-block:: javascript

  tronWeb.trx.getNodeInfo();

--------------
Parameters
--------------

N/A

-------
Returns
-------

Object

-------
Example
-------

.. code-block:: javascript

  >tronWeb.trx.getNodeInfo().then(console.log)
  >{
    activeConnectCount: 1,
    beginSyncNum: 988331,
    block: 'Num:988332,ID:00000000000f14ac2df439b094ee3011f6944416de895d76030eb556cada772c',
    cheatWitnessInfoMap: {},
    configNodeInfo: {
      activeNodeSize: 1,
      allowAdaptiveEnergy: 1,
      allowCreationOfContracts: 1,
      backupListenPort: 10001,
      backupMemberSize: 0,
      backupPriority: 6,
      codeVersion: '3.6.5',
      dbVersion: 2,
      discoverEnable: false,
      listenPort: 16666,
      maxConnectCount: 30,
      maxTimeRatio: 5,
      minParticipationRate: 0,
      minTimeRatio: 0,
      p2pVersion: '1',
      passiveNodeSize: 0,
      sameIpMaxConnectCount: 2,
      sendNodeSize: 0,
      supportConstant: true,
      versionName: 'Odyssey-v3.6.2-210-g5b6b40f79',
      versionNum: '11171'
    },
    currentConnectCount: 1,
    machineInfo: {
      cpuCount: 8,
      cpuRate: 0.006535947712418301,
      deadLockThreadCount: 0,
      deadLockThreadInfoList: [],
      freeMemory: 29074096128,
      javaVersion: '1.8.0_181',
      jvmFreeMemory: 22410225552,
      jvmTotalMemoery: 22576889856,
      memoryDescInfoList: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
      osName: 'Linux 4.14.109-99.92.amzn2.x86_64',
      processCpuRate: 0.007625272331154684,
      threadCount: 132,
      totalMemory: 33069928448
    },
    passiveConnectCount: 0,
    peerList: [
      {
        active: true,
        avgLatency: 171,
        blockInPorcSize: 0,
        connectTime: 1575594733742,
        disconnectTimes: 0,
        headBlockTimeWeBothHave: 0,
        headBlockWeBothHave: 'Num:240,ID:00000000000000f0b0ad46de952b5c48f97fa4944a2a776ce80d3389335da06c',
        host: '34.215.253.209',
        inFlow: 215274,
        lastBlockUpdateTime: 1575594739897,
        lastSyncBlock: '',
        localDisconnectReason: '',
        needSyncFromPeer: false,
        needSyncFromUs: false,
        nodeCount: 0,
        nodeId: '75b47073fd226a762cd6ee874d9e7a6c22eb34284e2db4f63777855f3fc4a1e6a2455974531ba730ce2d9f946485a394fcb870db61abcaf7c02ddef186ce67d6',
        port: 16666,
        remainNum: 0,
        remoteDisconnectReason: '',
        score: 0,
        syncBlockRequestedSize: 0,
        syncFlag: false,
        syncToFetchSize: 0,
        syncToFetchSizePeekNum: -1,
        unFetchSynNum: 0
      }
    ],
    solidityBlock: 'Num:988332,ID:00000000000f14ac2df439b094ee3011f6944416de895d76030eb556cada772c',
    totalFlow: 215274
  }
