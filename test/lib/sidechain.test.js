// const chai = require('chai');
// const assert = chai.assert;

// const assertThrow = require('../helpers/assertThrow');
// const accWebBuilder = require('../helpers/accWebBuilder');
// const wait = require('../helpers/wait');
// const { PRIVATE_KEY,
//     CONSUME_USER_RESOURCE_PERCENT,
//     DEPOSIT_FEE,
//     WITHDRAW_FEE,
//     MAPPING_FEE,
//     FEE_LIMIT,
//     TOKEN_ID,
//     CONTRACT_ADDRESS20,
//     CONTRACT_ADDRESS721,
//     ADDRESS20_MAPPING,
//     ADDRESS721_MAPPING,
//     HASH20,
//     HASH721,
//     RETRY_MAPPING_FEE,
//     RETRY_DEPOSIT_FEE,
//     RETRY_WITHDRAW_FEE,
//     TRC721_ID,
//     NONCE,
//     SIDE_CHAIN } = require('../helpers/config');

// describe("AccWeb.sidechain", function () {
//     describe('#deposit', function () {
//         describe('#depositTrx()', function () {
//             const accWeb = accWebBuilder.createInstanceSide();
//             it('deposit trx from main chain to side chain', async function () {
//                 const callValue = 10000000;
//                 const txID = await accWeb.sidechain.depositTrx(callValue, DEPOSIT_FEE, FEE_LIMIT);
//                 assert.equal(txID.length, 64);
//             });

//             it('depositTrx with the defined private key', async function () {
//                 const callValue = 10000000;
//                 const options = {};
//                 const txID = await accWeb.sidechain.depositTrx(callValue, DEPOSIT_FEE, FEE_LIMIT, options, PRIVATE_KEY);
//                 assert.equal(txID.length, 64);
//             });

//             it('depositTrx with permissionId in options object', async function () {
//                 const callValue = 10000000;
//                 const options = { permissionId: 0 };
//                 const txID = await accWeb.sidechain.depositTrx(callValue, DEPOSIT_FEE, FEE_LIMIT, options);
//                 assert.equal(txID.length, 64);
//             });

//             it('depositTrx with permissionId in options object and the defined private key', async function () {
//                 const callValue = 10000000;
//                 const options = { permissionId: 0 };
//                 const txID = await accWeb.sidechain.depositTrx(callValue, DEPOSIT_FEE, FEE_LIMIT, options, PRIVATE_KEY);
//                 assert.equal(txID.length, 64);
//             });

//             it('should throw if an invalid trx number is passed', async function () {
//                 await assertThrow(
//                     accWeb.sidechain.depositTrx(1000.01, DEPOSIT_FEE, FEE_LIMIT),
//                     'Invalid callValue provided'
//                 );
//             });

//             it('should throw if an invalid fee limit is passed', async function () {
//                 await assertThrow(
//                     accWeb.sidechain.depositTrx(10000, DEPOSIT_FEE, 0),
//                     'Invalid feeLimit provided'
//                 );
//             });

//             it('should check the balance of mainchain and sidechain after depositTrx', async function() {
//                 const callValue = 10000000;
//                 const dataBefore = await accWeb.sidechain.sidechain.trx.getAccount();
//                 const balanceBefore = dataBefore.balance;
//                 const txID = await accWeb.sidechain.depositTrx(callValue, DEPOSIT_FEE, FEE_LIMIT);
//                 assert.equal(txID.length, 64);
//                 await wait(90);
//                 const dataAfter = await accWeb.sidechain.sidechain.trx.getAccount();
//                 const balanceAfter = dataAfter.balance;
//                 assert.equal(balanceBefore + callValue, balanceAfter);
//             });
//         });

//         describe('#depositTrc10()', function () {
//             const accWeb = accWebBuilder.createInstanceSide();
//             it('deposit trc10 from main chain to side chain', async function () {
//                 const tokenValue = 10;
//                 const txID = await accWeb.sidechain.depositTrc10(TOKEN_ID, tokenValue, DEPOSIT_FEE, FEE_LIMIT);
//                 assert.equal(txID.length, 64);
//             });

//             it('depositTrc10 with the defined private key', async function () {
//                 const tokenValue = 10;
//                 const options = {};
//                 const txID = await accWeb.sidechain.depositTrc10(TOKEN_ID, tokenValue, DEPOSIT_FEE, FEE_LIMIT, options, PRIVATE_KEY);
//                 assert.equal(txID.length, 64);
//             });

//             it('depositTrc10 with permissionId in options object', async function () {
//                 const tokenValue = 10;
//                 const options = { permissionId: 0 };
//                 const txID = await accWeb.sidechain.depositTrc10(TOKEN_ID, tokenValue, DEPOSIT_FEE, FEE_LIMIT, options);
//                 assert.equal(txID.length, 64);
//             });

//             it('depositTrc10 with permissionId in options object and the defined private key', async function () {
//                 const tokenValue = 10;
//                 const options = { permissionId: 0 };
//                 const txID = await accWeb.sidechain.depositTrc10(TOKEN_ID, tokenValue, DEPOSIT_FEE, FEE_LIMIT, options, PRIVATE_KEY);
//                 assert.equal(txID.length, 64);
//             });

//             it('should throw if an invalid token id is passed', async function () {
//                 const tokenId = -10;
//                 await assertThrow(
//                     accWeb.sidechain.depositTrc10(tokenId, 100, DEPOSIT_FEE, FEE_LIMIT),
//                     'Invalid tokenId provided'
//                 )
//             });

//             it('should throw if an invalid token value is passed', async function () {
//                 const tokenValue = 100.01;
//                 await assertThrow(
//                     accWeb.sidechain.depositTrc10(TOKEN_ID, tokenValue, DEPOSIT_FEE, 1000000),
//                     'Invalid tokenValue provided'
//                 );
//             });

//             it('should throw if an invalid fee limit is passed', async function () {
//                 const feeLimit = 10000000000
//                 await assertThrow(
//                     accWeb.sidechain.depositTrc10(TOKEN_ID, 100, DEPOSIT_FEE, feeLimit),
//                     'Invalid feeLimit provided'
//                 );
//             });

//             it('should check the TRC10 balance of mainchain and sidechain after depositTrc10', async function() {
//                 const tokenValue = 10;
//                 const dataBefore = await accWeb.sidechain.sidechain.trx.getAccount();
//                 const balanceBefore = dataBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
//                 const txID = await accWeb.sidechain.depositTrc10(TOKEN_ID, tokenValue, DEPOSIT_FEE, FEE_LIMIT);
//                 assert.equal(txID.length, 64);
//                 await wait(80);
//                 const dataAfter = await accWeb.sidechain.sidechain.trx.getAccount();
//                 const balanceAfter = dataAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;;
//                 assert.equal(balanceBefore + tokenValue, balanceAfter);
//             });
//         });

//         describe('#depositTrc20', function () {
//             const accWeb = accWebBuilder.createInstanceSide();
//             it('deposit trc20 from main chain to side chain', async function () {
//                 const num = 100;
//                 const txID = await accWeb.sidechain.depositTrc20(num, DEPOSIT_FEE, FEE_LIMIT, CONTRACT_ADDRESS20);
//                 assert.equal(txID.length, 64);
//             });

//             it('depositTrc20 with the defined private key', async function () {
//                 const num = 100;
//                 const options = {};
//                 const txID = await accWeb.sidechain.depositTrc20(num, DEPOSIT_FEE, FEE_LIMIT, CONTRACT_ADDRESS20, options, PRIVATE_KEY);
//                 assert.equal(txID.length, 64);
//             });

//             it('depositTrc20 with permissionId in options object', async function () {
//                 const num = 100;
//                 const options = { permissionId: 0 };
//                 const txID = await accWeb.sidechain.depositTrc20(num, DEPOSIT_FEE, FEE_LIMIT, CONTRACT_ADDRESS20, options);
//                 assert.equal(txID.length, 64);
//             });

//             it('depositTrc20 with permissionId in options object and the defined private key', async function () {
//                 const num = 100;
//                 const options = { permissionId: 0 };
//                 const txID = await accWeb.sidechain.depositTrc20(num, DEPOSIT_FEE, FEE_LIMIT, CONTRACT_ADDRESS20, options, PRIVATE_KEY);
//                 assert.equal(txID.length, 64);
//             });

//             it('should throw if an invalid num is passed', async function () {
//                 const num = 100.01;
//                 await assertThrow(
//                     accWeb.sidechain.depositTrc20(num, DEPOSIT_FEE, FEE_LIMIT, CONTRACT_ADDRESS20),
//                     'Invalid num provided'
//                 );
//             });

//             it('should throw if an invalid fee limit is passed', async function () {
//                 const num = 100;
//                 const feeLimit = 100000000000;
//                 await assertThrow(
//                     accWeb.sidechain.depositTrc20(num, DEPOSIT_FEE, feeLimit, CONTRACT_ADDRESS20),
//                     'Invalid feeLimit provided'
//                 );
//             });

//             it('should throw if an invalid contract address is passed', async function () {
//                 await assertThrow(
//                     accWeb.sidechain.depositTrc20(100, DEPOSIT_FEE, FEE_LIMIT, 'aaaaaaaaaa'),
//                     'Invalid contractAddress address provided'
//                 );
//             });

//             it('should check the trc20 balance after depositTrc20', async function () {
//                 const num = 100;
//                 const options = {};
//                 // only mapping once
//                 // can check the mapping contract address in sidechain via call mainToSideContractMap(address) of mainchain gateway
//                 // const mappingResult = await accWeb.sidechain.mappingTrc20(HASH20, MAPPING_FEE, FEE_LIMIT,  options);
//                 // check the trc20 balance of mainchain before deposit
//                 const contractInstance = await accWeb.contract().at(CONTRACT_ADDRESS20);
//                 const address = accWeb.address.fromPrivateKey(PRIVATE_KEY);
//                 const dataBefore = await contractInstance.balanceOf(address).call();
//                 const balanceBefore = parseInt(dataBefore._hex, 16);

//                 // approve trc20
//                 // const approveResult = await accWeb.sidechain.approveTrc20(100000, FEE_LIMIT, CONTRACT_ADDRESS20);

//                 const txID = await accWeb.sidechain.depositTrc20(num, DEPOSIT_FEE, FEE_LIMIT, CONTRACT_ADDRESS20);
//                 await wait(80);
//                 const dataAfter = await contractInstance.balanceOf(address).call();
//                 const balanceAfter = parseInt(dataAfter._hex, 16);

//                 assert.equal(balanceBefore + num, balanceAfter);
//             });

//         });

//         describe('#depositTrc721', function () {
//             const accWeb = accWebBuilder.createInstanceSide();
//             it('deposit trc721 from main chain to side chain', async function () {
//                 const txID = await accWeb.sidechain.depositTrc721(TRC721_ID, DEPOSIT_FEE, FEE_LIMIT, CONTRACT_ADDRESS721);
//                 assert.equal(txID.length, 64);
//             });

//             it('should check the trc20 balance after depositTrc721', async function () {
//                 const num = 100;
//                 const options = {};
//                 // only mapping once
//                 // can check the mapping contract address in sidechain via call mainToSideContractMap(address) of mainchain gateway
//                 // const mappingResult = await accWeb.sidechain.mappingTrc20(HASH20, MAPPING_FEE, FEE_LIMIT,  options);
//                 // check the trc20 balance of mainchain before deposit
//                 const contractInstance = await accWeb.contract().at(CONTRACT_ADDRESS20);
//                 const address = accWeb.address.fromPrivateKey(PRIVATE_KEY);
//                 const dataBefore = await contractInstance.balanceOf(address).call();
//                 const balanceBefore = parseInt(dataBefore._hex, 16);

//                 // approve trc20
//                 // const approveResult = await accWeb.sidechain.approveTrc20(100000, FEE_LIMIT, CONTRACT_ADDRESS20);

//                 const txID = await accWeb.sidechain.depositTrc721(TRC721_ID, DEPOSIT_FEE, FEE_LIMIT, CONTRACT_ADDRESS721);
//                 await wait(80);
//                 const dataAfter = await contractInstance.balanceOf(address).call();
//                 const balanceAfter = parseInt(dataAfter._hex, 16);

//                 assert.equal(balanceBefore + num, balanceAfter);
//             });
//         });
//     });

//     describe('#mappingTrc', function () {
//         const accWeb = accWebBuilder.createInstanceSide();
//         it('mappingTrc20', async function () {
//             const txID = await accWeb.sidechain.mappingTrc20(HASH20, MAPPING_FEE, FEE_LIMIT);
//             assert.equal(txID.length, 64);
//         });

//         it('mappingTrc20 with the defined private key', async function () {
//             const options = {};
//             const txID = await accWeb.sidechain.mappingTrc20(HASH20, MAPPING_FEE, FEE_LIMIT, options, PRIVATE_KEY);
//             assert.equal(txID.length, 64);
//         });

//         it('mappingTrc20 with permissionId in options object', async function () {
//             const options = { permissionId: 0 };
//             const txID = await accWeb.sidechain.mappingTrc20(HASH20, MAPPING_FEE, FEE_LIMIT, options);
//             assert.equal(txID.length, 64);
//         });

//         it('mappingTrc20 with permissionId in options object and the defined private key', async function () {
//             const options = { permissionId: 0 };
//             const txID = await accWeb.sidechain.mappingTrc20(HASH20, MAPPING_FEE, FEE_LIMIT, options, PRIVATE_KEY);
//             assert.equal(txID.length, 64);
//         });

//         it('should throw if an invalid trxHash', async function () {
//             const trxHash = '';
//             await assertThrow(
//                 accWeb.sidechain.mappingTrc20(trxHash, MAPPING_FEE, FEE_LIMIT),
//                 'Invalid trxHash provided'
//             );
//         });

//         it('should throw if an invalid fee limit is passed', async function () {
//             const feeLimit = 100000000000;
//             await assertThrow(
//                 accWeb.sidechain.mappingTrc20(HASH20, MAPPING_FEE, feeLimit),
//                 'Invalid feeLimit provided'
//             );
//         });

//         it('check the transaction result after mapping TRC20', async function () {
//             const mappingResult = await accWeb.sidechain.mappingTrc20(HASH20, MAPPING_FEE, FEE_LIMIT);
//             while(true) {
//                 let checkResult = await accWeb.trx.getTransactionInfo(mappingResult);
//                 if (checkResult && checkResult.result) {
//                     break;
//                 }
//             }
//         });

//         it('should get the mapping address after mappingTrc20', async function() {
//             const sideGatawayInstance = await accWeb.sidechain.sidechain.contract().at(SIDE_CHAIN.sideOptions.sideGatewayAddress);
//             const result = await sideGatawayInstance.mainToSideContractMap(CONTRACT_ADDRESS20).call();
//             assert.isTrue(accWeb.isAddress(result));
//         });

//         it('mappingTrc721', async function () {
//             const txID = await accWeb.sidechain.mappingTrc721(HASH721, MAPPING_FEE, FEE_LIMIT);
//             assert.equal(txID.length, 64);
//         });

//         it('check the transaction result after mapping TRC721', async function () {
//             const mappingResult = await accWeb.sidechain.mappingTrc721(HASH721, MAPPING_FEE, FEE_LIMIT);
//             while(true) {
//                 let checkResult = await accWeb.trx.getTransactionInfo(mappingResult);
//                 if (checkResult && checkResult.result) {
//                     break;
//                 }
//             }
//         });

//         it('should get the mapping address after mappingTrc721', async function() {
//             const sideGatawayInstance = await accWeb.sidechain.sidechain.contract().at(SIDE_CHAIN.sideOptions.sideGatewayAddress);
//             const result = await sideGatawayInstance.mainToSideContractMap(CONTRACT_ADDRESS721).call();
//             assert.isTrue(accWeb.isAddress(result));
//         });
//     });

//     describe('#withdraw', function () {
//         describe('#withdrawTrx()', function () {
//             const accWeb = accWebBuilder.createInstanceSide();
//             it('withdraw trx from side chain to main chain', async function () {
//                 const txID = await accWeb.sidechain.withdrawTrx(10000000, WITHDRAW_FEE, 10000000);
//                 assert.equal(txID.length, 64);
//             });

//             it('withdrawTrx with the defined private key', async function () {
//                 const callValue = 10000000;
//                 const options = {};
//                 const txID = await accWeb.sidechain.withdrawTrx(callValue, WITHDRAW_FEE, FEE_LIMIT, options, PRIVATE_KEY);
//                 assert.equal(txID.length, 64);
//             });

//             it('withdrawTrx with permissionId in options object', async function () {
//                 const callValue = 10000000;
//                 const options = { permissionId: 0 };
//                 const txID = await accWeb.sidechain.withdrawTrx(callValue, WITHDRAW_FEE, FEE_LIMIT, options);
//                 assert.equal(txID.length, 64);
//             });

//             it('withdrawTrx with permissionId in options object and the defined private key', async function () {
//                 const callValue = 10000000;
//                 const options = { permissionId: 0 };
//                 const txID = await accWeb.sidechain.withdrawTrx(callValue, WITHDRAW_FEE, FEE_LIMIT, options, PRIVATE_KEY);
//                 assert.equal(txID.length, 64);
//             });

//             it('should throw if an invalid trx number is passed', async function () {
//                 await assertThrow(
//                     accWeb.sidechain.withdrawTrx(1000.01, WITHDRAW_FEE, FEE_LIMIT),
//                     'Invalid callValue provided'
//                 );
//             });

//             it('should throw if an invalid fee limit is passed', async function () {
//                 await assertThrow(
//                     accWeb.sidechain.withdrawTrx(10000, WITHDRAW_FEE, 0),
//                     'Invalid feeLimit provided'
//                 );
//             });

//             it('should check the balance of mainchain and sidechain after withdrawTrx', async function() {
//                 const callValue = 10000000;
//                 const dataBefore = await accWeb.trx.getAccount();
//                 const balanceBefore = dataBefore.balance;
//                 const txID = await accWeb.sidechain.withdrawTrx(callValue, WITHDRAW_FEE, FEE_LIMIT);
//                 await wait(90);
//                 const dataAfter = await accWeb.trx.getAccount();
//                 const balanceAfter = dataAfter.balance;
//                 assert.equal(balanceBefore + callValue, balanceAfter);
//             });
//         });

//         describe('#withdrawTrc10()', function () {
//             const accWeb = accWebBuilder.createInstanceSide();
//             it('withdraw trc10 from side chain to main chain', async function () {
//                 const tokenValue = 10;
//                 const txID = await accWeb.sidechain.withdrawTrc10(TOKEN_ID, tokenValue, WITHDRAW_FEE, FEE_LIMIT);
//                 assert.equal(txID.length, 64);
//             });

//             it('withdrawTrc10 with the defined private key', async function () {
//                 const tokenValue = 10;
//                 const options = {};
//                 const txID = await accWeb.sidechain.withdrawTrc10(TOKEN_ID, tokenValue, WITHDRAW_FEE, FEE_LIMIT, options, PRIVATE_KEY);
//                 assert.equal(txID.length, 64);
//             });

//             it('withdrawTrc10 with permissionId in options object', async function () {
//                 const tokenValue = 10;
//                 const options = { permissionId: 0 };
//                 const txID = await accWeb.sidechain.withdrawTrc10(TOKEN_ID, tokenValue, WITHDRAW_FEE, FEE_LIMIT, options);
//                 assert.equal(txID.length, 64);
//             });

//             it('withdrawTrc10 with permissionId in options object and the defined private key', async function () {
//                 const tokenValue = 10;
//                 const options = { permissionId: 0 };
//                 const txID = await accWeb.sidechain.withdrawTrc10(TOKEN_ID, tokenValue, WITHDRAW_FEE, FEE_LIMIT, options, PRIVATE_KEY);
//                 assert.equal(txID.length, 64);
//             });

//             it('should throw if an invalid token id is passed', async function () {
//                 const tokenId = -10;
//                 await assertThrow(
//                     accWeb.sidechain.withdrawTrc10(tokenId, 100, WITHDRAW_FEE, 1000000),
//                     'Invalid tokenId provided'
//                 )
//             });

//             it('should throw if an invalid token value is passed', async function () {
//                 const tokenValue = 10.01;
//                 await assertThrow(
//                     accWeb.sidechain.withdrawTrc10(TOKEN_ID, tokenValue, WITHDRAW_FEE, FEE_LIMIT),
//                     'Invalid tokenValue provided'
//                 );
//             });

//             it('should throw if an invalid fee limit is passed', async function () {
//                 const feeLimit = 100000000000;
//                 await assertThrow(
//                     accWeb.sidechain.withdrawTrc10(TOKEN_ID, 100, WITHDRAW_FEE, feeLimit),
//                     'Invalid feeLimit provided'
//                 );
//             });

//             it('should check the TRC10 balance of mainchain and sidechain after withdrawTrc10', async function() {
//                 const tokenValue = 10;
//                 const dataBefore = await accWeb.trx.getAccount();
//                 const balanceBefore = dataBefore.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;
//                 const txID = await accWeb.sidechain.withdrawTrc10(TOKEN_ID, tokenValue, DEPOSIT_FEE, FEE_LIMIT);
//                 assert.equal(txID.length, 64);
//                 await wait(90);
//                 const dataAfter = await accWeb.trx.getAccount();
//                 const balanceAfter = dataAfter.assetV2.filter((item)=> item.key == TOKEN_ID)[0].value;;
//                 assert.equal(balanceBefore + tokenValue, balanceAfter);
//             });
//         });

//         describe('#withdrawTrc', function () {
//             describe('#withdrawTrc20', function () {
//                 const accWeb = accWebBuilder.createInstanceSide();
//                 it('withdraw trc20 from side chain to main chain', async function () {
//                     const num = 10;
//                     const txID = await accWeb.sidechain.withdrawTrc20(num, WITHDRAW_FEE, FEE_LIMIT, ADDRESS20_MAPPING);
//                     assert.equal(txID.length, 64);
//                 });

//                 it('withdrawTrc20 with the defined private key', async function () {
//                     const num = 10;
//                     const options = {};
//                     const txID = await accWeb.sidechain.withdrawTrc20(num, WITHDRAW_FEE, FEE_LIMIT, ADDRESS20_MAPPING, options, PRIVATE_KEY);
//                     assert.equal(txID.length, 64);
//                 });

//                 it('withdrawTrc20 with permissionId in options object', async function () {
//                     const num = 10;
//                     const options = { permissionId: 0 };
//                     const txID = await accWeb.sidechain.withdrawTrc20(num, WITHDRAW_FEE, FEE_LIMIT, ADDRESS20_MAPPING, options);
//                     assert.equal(txID.length, 64);
//                 });

//                 it('withdrawTrc20 with permissionId in options object and the defined private key', async function () {
//                     const num = 10;
//                     const options = { permissionId: 0 };
//                     const txID = await accWeb.sidechain.withdrawTrc20(num, WITHDRAW_FEE, FEE_LIMIT, ADDRESS20_MAPPING, options, PRIVATE_KEY);
//                     assert.equal(txID.length, 64);
//                 });

//                 it('should throw if an invalid num is passed', async function () {
//                     const num = 10.01;
//                     await assertThrow(
//                         accWeb.sidechain.withdrawTrc20(num, WITHDRAW_FEE, FEE_LIMIT, ADDRESS20_MAPPING),
//                         'Invalid numOrId provided'
//                     );
//                 });

//                 it('should throw if an invalid fee limit is passed', async function () {
//                     const feeLimit = 100000000000;
//                     await assertThrow(
//                         accWeb.sidechain.withdrawTrc20(100, WITHDRAW_FEE, feeLimit, ADDRESS20_MAPPING),
//                         'Invalid feeLimit provided'
//                     );
//                 });

//                 it('should throw if an invalid contract address is passed', async function () {
//                     await assertThrow(
//                         accWeb.sidechain.withdrawTrc20(100, WITHDRAW_FEE, FEE_LIMIT, 'aaaaaaaaaa'),
//                         'Invalid contractAddress address provided'
//                     );
//                 });

//                 it('should check the trc20 balance after withdrawTrc20', async function () {
//                     const num = 10;
//                     const contractInstance = await accWeb.contract().at(CONTRACT_ADDRESS20);
//                     const address = accWeb.address.fromPrivateKey(PRIVATE_KEY);
//                     const dataBefore = await contractInstance.balanceOf(address).call();
//                     const balanceBefore = parseInt(dataBefore._hex, 16);
//                     const txID = await accWeb.sidechain.withdrawTrc20(num, WITHDRAW_FEE, FEE_LIMIT, ADDRESS20_MAPPING);

//                     await wait(80);

//                     const dataAfter = await contractInstance.balanceOf(address).call();
//                     const balanceAfter = parseInt(dataAfter._hex, 16);

//                     assert.equal(balanceBefore + num, balanceAfter);
//                 });
//             });

//             describe('#withdrawTrc721', async function () {
//                 const accWeb = accWebBuilder.createInstanceSide();
//                 it('withdraw trc721 from side chain to main chain', async function () {
//                     const txID = await accWeb.sidechain.withdrawTrc721(TRC721_ID, WITHDRAW_FEE, FEE_LIMIT, ADDRESS20_MAPPING);
//                     assert.equal(txID.length, 64);
//                 });
//             });
//         });
//     });

//     describe('#injectFund', function() {
//         it('excute injectFund', async function() {
//             const accWeb = accWebBuilder.createInstanceSide();
//             const txID = await accWeb.sidechain.injectFund(1000000, FEE_LIMIT);
//             assert.equal(txID.length, 64);
//         });
//     });


//     describe('#retry', function() {
//         it('retry mapping', async function() {
//             const accWeb = accWebBuilder.createInstanceSide();
//             const txID = await accWeb.sidechain.retryMapping(NONCE, RETRY_MAPPING_FEE, FEE_LIMIT);
//             assert.equal(txID.length, 64);
//         });

//         it('retry deposit', async function() {
//             const accWeb = accWebBuilder.createInstanceSide();
//             const txID = await accWeb.sidechain.retryDeposit(NONCE, RETRY_DEPOSIT_FEE, FEE_LIMIT);
//             assert.equal(txID.length, 64);
//         });

//         it('retry withdraw', async function() {
//             const accWeb = accWebBuilder.createInstanceSide();
//             const txID = await accWeb.sidechain.retryWithdraw(NONCE, RETRY_WITHDRAW_FEE, FEE_LIMIT);
//             assert.equal(txID.length, 64);
//         });
//     });

// })
