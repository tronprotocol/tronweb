const TronWeb = require('../../dist/TronWeb.node.js');

const fullNode = 'https://api.shasta.trongrid.io';
const solidityNode = 'https://api.shasta.trongrid.io';
const eventServer = 'https://api.shasta.trongrid.io/';
const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';

const app = async () => {
    const tronWeb = new TronWeb(
        fullNode,
        solidityNode,
        eventServer,
        privateKey
    );

    tronWeb.setDefaultBlock('latest');

    const nodes = await tronWeb.isConnected();
    const connected = !Object.entries(nodes).map(([name, connected]) => {
        if (!connected)
            console.error(`Error: ${name} is not connected`);

        return connected;
    }).includes(false);

    if (!connected)
        return;

    const account = await tronWeb.createAccount();
    const isValid = tronWeb.isAddress(account.address.hex);

    console.group('\nGenerated account');
        console.log('- Private Key:', account.privateKey);
        console.log('- Public Key: ', account.publicKey);
        console.group('Address')
            console.log('- Base58:', account.address.base58);
            console.log('- Hex:   ', account.address.hex);
            console.log('- Valid: ', isValid, '\n')
        console.groupEnd();
    console.groupEnd();

    const currentBlock = await tronWeb.trx.getCurrentBlock();

    console.group('Current block');
        console.log(JSON.stringify(currentBlock, null, 2), '\n');
    console.groupEnd();

    // You can use latest, earliest, a block hash or block number
    const previousBlock = await tronWeb.trx.getBlock('0');

    console.group('Previous block #52');
        console.log(JSON.stringify(previousBlock, null, 2), '\n');
    console.groupEnd();

    const genesisBlockCount = await tronWeb.trx.getBlockTransactionCount('earliest');

    console.group('Genesis Block Transaction Count');
        console.log('Transactions:', genesisBlockCount, '\n');
    console.groupEnd();

    tronWeb.trx.getTransaction('2429559770c908e262d2510592cc0948f6bdec9288c528ef5ed6a22ea75148de').then(transaction => {
        console.group('Transaction');
            console.log('- Hash:', transaction.txID);
            console.log('- Transaction:\n' + JSON.stringify(transaction, null, 2), '\n');
        console.groupEnd();
    }).catch(err => console.error(err));

    tronWeb.trx.getTransactionsRelated('TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1', 'all').then(transactions => {
        console.group('Transactions relating to address');
            console.log('- Address: TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1');
            console.log('- Transactions:\n' + JSON.stringify(transactions, null, 2), '\n');
        console.groupEnd();
    }).catch(err => console.error(err));

    tronWeb.trx.getAccount('4144abc6018aec80cf05e3ac94376d6cd76da1b112').then(accountInfo => {
        console.group('Account information');
            console.log('- Address: 4144abc6018aec80cf05e3ac94376d6cd76da1b112');
            console.log('- Account:\n' + JSON.stringify(accountInfo, null, 2), '\n');
        console.groupEnd();
    }).catch(err => console.error(err));

    tronWeb.trx.getBalance('TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1').then(balance => {
        console.group('Account balance');
            console.log('- Address: TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1');
            console.log('- Balance:', balance, '\n');
        console.groupEnd();
    }).catch(err => console.error(err));

    tronWeb.trx.getBandwidth('TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1').then(bandwidth => {
        console.group('Account bandwidth');
            console.log('- Address: 4144abc6018aec80cf05e3ac94376d6cd76da1b112');
            console.log('- Bandwidth:', bandwidth, '\n');
        console.groupEnd();
    }).catch(err => console.error(err));

    tronWeb.trx.getTokensIssuedByAddress('TSZRsyxQrTFrjpAoqsPJj1pS4pacBnsBx1').then(tokens => {
        console.group('Tokens from address');
            console.log('- Owner Address: TSZRsyxQrTFrjpAoqsPJj1pS4pacBnsBx1');
            console.log('- Tokens:\n' + JSON.stringify(tokens, null, 2), '\n');
        console.groupEnd();
    }).catch(err => console.error(err));

    tronWeb.trx.getTokenFromID('TestToken').then(token => {
        console.group('Tokens from its name');
            console.log('- Token Name: TestToken');
            console.log('- Token:\n' + JSON.stringify(token, null, 2), '\n');
        console.groupEnd();
    }).catch(err => console.error(err));    

    const nodeList = await tronWeb.trx.listNodes();

    console.group('List of full nodes');
        console.log('- Node Count:', nodeList.length);
        console.log('- Nodes:', JSON.stringify(nodeList), '\n');
    console.groupEnd();

    const blockRange = await tronWeb.trx.getBlockRange(30, 35);

    console.group('Block IDs between 30 and 35');
        console.log('- Block Range: [ 30, 35 ]');
        console.log('- Blocks IDs:', blockRange.map(block => {
            return block.block_header.raw_data.number || 0;
        }), '\n');
    console.groupEnd();

    const superRepresentatives = await tronWeb.trx.listSuperRepresentatives();

    console.group('List of super representatives');
        console.log('- SR Count:', superRepresentatives.length);
        console.log('- SRs:', JSON.stringify(superRepresentatives, null, 2), '\n');
    console.groupEnd();

    const fullTokenList = await tronWeb.trx.listTokens();

    console.group('List of tokens');
        console.log('- Token Count:', fullTokenList.length);
        console.log('- Tokens:', JSON.stringify(fullTokenList, null, 2), '\n');
    console.groupEnd();

    await tronWeb.trx.listTokens(2, (err, tokens) => {
        if(err)
            return console.error(err);

        console.group('Partial list of tokens');
            console.log('- Token Count:', tokens.length);
            console.log('- Tokens:', JSON.stringify(tokens, null, 2), '\n');
        console.groupEnd();
    });

    // const nextVoteCycle = await tronWeb.trx.timeUntilNextVoteCycle();
    //
    // console.group('Next vote cycle');
    //     console.log('- Time Remaining:', nextVoteCycle + 'ms');
    //     console.log('- Occurs At:', new Date(Date.now() + nextVoteCycle), '\n');
    // console.groupEnd();

    tronWeb.trx.getContract('TBjntEor6jTdDkAETyYMtbWqHnmpVBQ99Q').then(contract => {
        console.group('Contract from node');
            console.log('- Contract Address: TBjntEor6jTdDkAETyYMtbWqHnmpVBQ99Q');
            console.log('- Origin Address:', contract.origin_address);
            console.log('- Bytecode:', contract.bytecode);
            console.log('- ABI:\n' + JSON.stringify(contract.abi, null, 2), '\n');
        console.groupEnd();
    }).catch(err => console.error(err));

    const sendTransaction = await tronWeb.transactionBuilder.sendTrx('TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1', 10);

    console.group('Unsigned send TRX transaction');
        console.log('- Recipient: TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1');
        console.log('- Transaction:\n' + JSON.stringify(sendTransaction, null, 2), '\n');
    console.groupEnd();

    // There are no tokens on the network yet
    // const sendToken = await tronWeb.transactionBuilder.sendToken('TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1', 10, 'TestToken_1');
    // 
    // console.group('Unsigned send token transaction');
    //     console.log('- Recipient: TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1');
    //     console.log('- Token: TestToken_1');
    //     console.log('- Transaction:\n' + JSON.stringify(sendToken, null, 2), '\n');
    // console.groupEnd();
    // 
    // const purchaseToken = await tronWeb.transactionBuilder.purchaseToken('41a8572327f883078cdb971317f91647d0a1cd4db0', 'BetterToken', 10);
    // 
    // console.group('Unsigned purchase token transaction');
    //     console.log('- Token Owner: 41a8572327f883078cdb971317f91647d0a1cd4db0');
    //     console.log('- Token: BetterToken');
    //     console.log('- Transaction:\n' + JSON.stringify(purchaseToken, null, 2), '\n');
    // console.groupEnd();

    const freezeBalance = await tronWeb.transactionBuilder.freezeBalance('41928c9af0651632157ef27a2cf17ca72c575a4d21', 20000000);

    console.group('Unsigned freeze balance transaction');
        console.log('- Address: 41928c9af0651632157ef27a2cf17ca72c575a4d21');;
        console.log('- Transaction:\n' + JSON.stringify(freezeBalance, null, 2), '\n');
    console.groupEnd();

    tronWeb.transactionBuilder.unfreezeBalance('TYkfNHvpfwU7iX2hUpXQ7pjRY7Lg6SEZ96', (err, transaction) => {
        if(err)
            return console.error(err);

        console.group('Unsigned unfreeze balance transaction');
            console.log('- Address: TYkfNHvpfwU7iX2hUpXQ7pjRY7Lg6SEZ96');
            console.log('- Transaction:\n' + JSON.stringify(transaction, null, 2), '\n');
        console.groupEnd();
    }); 
    
    tronWeb.transactionBuilder.withdrawBlockRewards('TYkfNHvpfwU7iX2hUpXQ7pjRY7Lg6SEZ96', (err, transaction) => {
        if(err)
            return console.error(err);

        console.group('Unsigned withdraw block rewards transaction');
            console.log('- Address: TYkfNHvpfwU7iX2hUpXQ7pjRY7Lg6SEZ96');
            console.log('- Transaction:\n' + JSON.stringify(transaction, null, 2), '\n');
        console.groupEnd();
    });

    tronWeb.transactionBuilder.applyForSR('https://tron.watch', (err, transaction) => {
        if(err)
            return console.error(err);

        console.group('Unsigned apply for SR transaction');
            console.log('- Address:', tronWeb.defaultAddress.base58);
            console.log('- Transaction:\n' + JSON.stringify(transaction, null, 2), '\n');
        console.groupEnd();
    });    

    tronWeb.transactionBuilder.vote({
        '41c2d52f2511808307c848b808649595f631527111': 1000000
    }, (err, transaction) => {
        if(err)
            return console.error(err);

        console.group('Unsigned vote for SR transaction');
            console.log('- Super Representative: 41c2d52f2511808307c848b808649595f631527111');
            console.log('- Transaction:\n' + JSON.stringify(transaction, null, 2), '\n');
        console.groupEnd();
    });

    tronWeb.transactionBuilder.createSmartContract({
        abi: [{"constant":false,"inputs":[],"name":"add","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"subtract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
        bytecode: '6080604052600560005534801561001557600080fd5b5060c9806100246000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634f2be91f14604e5780636deebae3146062575b600080fd5b348015605957600080fd5b5060606076565b005b348015606d57600080fd5b5060746089565b005b6000808154809291906001019190505550565b6000808154809291906001900391905055505600a165627a7a723058206f99daf0981439d56ad42ecbcf1d432ea709c081b3af8646ae086bfb7273d5930029',
        feeLimit: 30000
    }, '41c2d52f2511808307c848b808649595f631527111', (err, transaction) => {
        if(err)
            return console.error(err);
    
        console.group('Unsigned create smart contract transaction');
            console.log('- Issuer Address: 41c2d52f2511808307c848b808649595f631527111');
            console.log('- Transaction:\n' + JSON.stringify(transaction, null, 2), '\n');
        console.groupEnd();
    });
    
    tronWeb.transactionBuilder.triggerSmartContract(
        '413c8143e98b3e2fe1b1a8fb82b34557505a752390',
        'multiply(int256,int256)',
        30000,
        0,
        [
            { type: 'int256', value: 1 },
            { type: 'int256', value: 1 }
        ],
    (err, transaction) => {
        if(err)
            return console.error(err);
    
        console.group('Unsigned trigger smart contract transaction');
            console.log('- Contract Address: 413c8143e98b3e2fe1b1a8fb82b34557505a752390');
            console.log('- Transaction:\n' + JSON.stringify(transaction, null, 2), '\n');
        console.groupEnd();
    });
  
    tronWeb.transactionBuilder.createToken({
        name: 'TestToken',
        abbreviation: 'TTKN',
        description: 'Useless utility token',
        url: 'https://google.com',
        totalSupply: 57,
        saleEnd: Date.now() + 1000 * 60 * 60 * 24 * 30,
        frozenAmount: 5,
        frozenDuration: 1
    }, (err, transaction) => {
        if(err)
            return console.error(err);

        console.group('Unsigned create token transaction');
            console.log('- Transaction:\n' + JSON.stringify(transaction, null, 2), '\n');
        console.groupEnd();
    });

    tronWeb.transactionBuilder.updateToken({
        description: 'Useless (TM) utility token',
        url: 'https://improved.google.com',
        freeBandwidth: 68,
        freeBandwidthLimit: 12
    }, async (err, transaction) => {
        if(err)
            return console.error(err);

        console.group('Unsigned update token transaction');
            console.log('- Token Name: TestToken')
            console.log('- Transaction:\n' + JSON.stringify(transaction, null, 2), '\n');
        console.groupEnd();

        const signedTransaction = await tronWeb.trx.sign(transaction);

        console.group('Signed update token transaction');
            console.log('- Transaction:\n' + JSON.stringify(signedTransaction, null, 2), '\n');
        console.groupEnd();

        tronWeb.trx.sendRawTransaction(signedTransaction, (err, result) => {
            if(err)
                return console.error(err);
            
            console.group('Broadcast update token transaction');
                console.log('- Result:\n' + JSON.stringify(result, null, 2), '\n');
            console.groupEnd();
        });
    });

    tronWeb.trx.sendTransaction('TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1', 10, (err, result) => {
        if(err)
            return console.error(err);

        console.group('Send TRX transaction');
            console.log('- Result:\n' + JSON.stringify(result, null, 2), '\n');
        console.groupEnd();
    });

    tronWeb.trx.sendToken('TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1', 10, 'TestToken_1', (err, result) => {
        if(err)
            return console.error(err);

        console.group('Send token transaction');
            console.log('Token Name: TestToken_1');
            console.log('- Result:\n' + JSON.stringify(result, null, 2), '\n');
        console.groupEnd();
    });

    tronWeb.getEventResult('TKexVE6nKujFaLZeAQh8YRVXda3gjpX1sV', 'Notify', 32162, (err, events) => {
        if(err)
            return console.error(err);

        console.group('Event result');
            console.log('Contract Address: TKexVE6nKujFaLZeAQh8YRVXda3gjpX1sV');
            console.log('Event Name: Notify');
            console.log('Block Number: 32162');
            console.log('- Events:\n' + JSON.stringify(events, null, 2), '\n');
        console.groupEnd();
    });

    tronWeb.getEventByTransacionID('32d7efe5f70c044bcd831f21f911209a7abf4ed0d5934b2c1b804e108008cd43', (err, events) => {
        if(err)
            return console.error(err);

        console.group('Specific event result');
            console.log('Transaction: 32d7efe5f70c044bcd831f21f911209a7abf4ed0d5934b2c1b804e108008cd43');
            console.log('- Events:\n' + JSON.stringify(events, null, 2), '\n');
        console.groupEnd();
    });

    const newContract = await tronWeb.contract().new({
        abi: [{"constant":true,"inputs":[{"name":"a","type":"int256"},{"name":"b","type":"int256"}],"name":"test","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"a","type":"int256"},{"name":"b","type":"int256"}],"name":"multiply","outputs":[{"name":"out","type":"int256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getLast","outputs":[{"name":"a","type":"int256"},{"name":"b","type":"int256"},{"name":"result","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"int256"},{"name":"b","type":"int256"}],"name":"test2","outputs":[{"name":"","type":"int256"},{"name":"","type":"int256"}],"payable":false,"stateMutability":"pure","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"a","type":"int256"},{"indexed":false,"name":"b","type":"int256"},{"indexed":false,"name":"result","type":"int256"}],"name":"Message","type":"event"}],
        bytecode: '6080604052600080556000600155600060025534801561001e57600080fd5b506101b58061002e6000396000f3006080604052600436106100615763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166324d45ec381146100665780633c4308a8146100935780634d622831146100ae578063dbdb6f4c146100e1575b600080fd5b34801561007257600080fd5b50610081600435602435610115565b60408051918252519081900360200190f35b34801561009f57600080fd5b50610081600435602435610119565b3480156100ba57600080fd5b506100c3610172565b60408051938452602084019290925282820152519081900360600190f35b3480156100ed57600080fd5b506100fc600435602435610180565b6040805192835260208301919091528051918290030190f35b0290565b600082815560018290558282026002819055604080518581526020810185905280820183905290517f871be7ac645cb26e405787c3fc8c8b2b252833674fcb153e80e6391908cab62c9181900360600190a19392505050565b600054600154600254909192565b029060028202905600a165627a7a723058200afed89e050d3542c071881fe50faf94067330b2053cf28ea5691e24a06105270029'
    });

    //const newContract = await tronWeb.contract().at('TGC6vcQCGEuP6AiRiAgsY8obat1iWDHkig');

    /*const eventListener = newContract.events(event => {
        console.group('New event received');
            console.log('- Contract Address:', event.contract);
            console.log('- Event Name:', event.name);
            console.log('- Transaction:', event.transaction);
            console.log('- Block number:', event.block);            
            console.log('- Result:', event.result, '\n');
        console.groupEnd();
    }).start(err => {
        if(err)
            return console.error('Failed to start event listener:', err);

        console.log('Event listener started\n');
    });*/

    newContract && newContract.Message().watch((err, event) => {
        if(err)
            return console.error('Error with "Message" event:', err);

        console.group('New event received');
            console.log('- Contract Address:', event.contract);
            console.log('- Event Name:', event.name);
            console.log('- Transaction:', event.transaction);
            console.log('- Block number:', event.block);            
            console.log('- Result:', event.result, '\n');
        console.groupEnd();
    });

    // This is a pure function so it's only executed on the local node 
    newContract && newContract.test(1, 1000000).call().then(async output => {
        console.group('Contract "test" result');
            console.log('- Output:', output.toString(), '\n');
        console.groupEnd();

        // The "send" function propagates to all SRs, which can take up to 1 minute
        await Promise.all([
            newContract.multiply(1, 1000000).send(),
            newContract.multiply(2, 1000000).send(),
            newContract.multiply(3, 1000000).send(),
            newContract.multiply(4, 1000000).send(),
            newContract.multiply(5, 1000000).send()
        ]);

        return newContract.getLast().call();
    }).then(output => {
        console.group('Contract "getLast" result');
            console.log('- Output:\n' + JSON.stringify(output, null, 2), '\n');
        console.groupEnd();       
    }).catch(err => console.error(err));

    const firstTransaction = await tronWeb.trx.getTransactionFromBlock(0, 0);

    console.group('First transaction from block 0');
        console.log('- Transaction:\n' + JSON.stringify(firstTransaction, null, 2), '\n');
    console.groupEnd();
};

app();
