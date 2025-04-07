// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb.js';

import '../protocol/core/Tron_pb.cjs';
const { Transaction, Permission, Key } = globalThis.TronWebProto;

import '../protocol/core/contract/balance_contract_pb.cjs';
const {
    TransferContract,
    FreezeBalanceContract,
    UnfreezeBalanceContract,
    WithdrawBalanceContract,
    FreezeBalanceV2Contract,
    UnfreezeBalanceV2Contract,
    CancelAllUnfreezeV2Contract,
    WithdrawExpireUnfreezeContract,
    DelegateResourceContract,
    UnDelegateResourceContract,
} = globalThis.TronWebProto;

import '../protocol/core/contract/asset_issue_contract_pb.cjs';
const { TransferAssetContract, ParticipateAssetIssueContract, AssetIssueContract, UpdateAssetContract } = globalThis.TronWebProto;

import '../protocol/core/contract/smart_contract_pb.cjs';
const {
    TriggerSmartContract,
    ClearABIContract,
    UpdateEnergyLimitContract,
    UpdateSettingContract,
    CreateSmartContract,
    SmartContract,
} = globalThis.TronWebProto;

import '../protocol/core/contract/common_pb.cjs';
const { ResourceCode } = globalThis.TronWebProto;

import '../protocol/core/contract/witness_contract_pb.cjs';
const { WitnessCreateContract, VoteWitnessContract } = globalThis.TronWebProto;

import '../protocol/core/contract/storage_contract_pb.cjs';
const { UpdateBrokerageContract } = globalThis.TronWebProto;

import '../protocol/core/contract/account_contract_pb.cjs';
const { AccountCreateContract, AccountUpdateContract, SetAccountIdContract, AccountPermissionUpdateContract } =
    globalThis.TronWebProto;

import '../protocol/core/contract/proposal_contract_pb.cjs';
const { ProposalCreateContract, ProposalDeleteContract, ProposalApproveContract } = globalThis.TronWebProto;

import '../protocol/core/contract/exchange_contract_pb.cjs';
const { ExchangeCreateContract, ExchangeInjectContract, ExchangeWithdrawContract, ExchangeTransactionContract } =
    globalThis.TronWebProto;

import { byteArray2hexStr } from './bytes.js';
import { hexStr2byteArray } from './code.js';
import { sha256, keccak256 } from './ethersUtils.js';
import TronWeb from '../tronweb.js';
import { isHex } from './validations.js';

const fromHexString = (hexString: string) => {
    if (!hexString || hexString.length === 0) return new Uint8Array([]);
    return new Uint8Array(
        TronWeb.address
            .toHex(hexString)
            .match(/.{1,2}/g)
            .map((byte: string) => parseInt(byte, 16))
    );
};

const stringToUint8Array = (hexString: string) => {
    if (!hexString || hexString.length === 0) return new Uint8Array([]);
    return new Uint8Array(
        (isHex(hexString) ? hexString : TronWeb.toHex(hexString))
            .replace(/^0x/, '')
            .match(/.{1,2}/g)
            .map((byte: string) => parseInt(byte, 16))
    );
};

const flexToUint8Array = (str: string, visible: boolean) => {
    if (!visible) return stringToUint8Array(str.replace(/^0x/, ''));
    return stringToUint8Array(TronWeb.fromUtf8(str).replace(/^0x/, ''));
};

const sha3 = (string: string, prefix = true) => {
    return (prefix ? '0x' : '') + keccak256(Buffer.from(string, 'utf-8')).toString().substring(2);
};

const buildCommonTransaction = (message, contractType, typeName, permissionId) => {
    const anyValue = new google_protobuf_any_pb.Any();
    anyValue.pack(message.serializeBinary(), 'protocol.' + typeName);
    const contract = new Transaction.Contract();
    contract.setType(contractType);
    contract.setParameter(anyValue);
    if (permissionId) {
        contract.setPermissionId(permissionId);
    }
    const raw = new Transaction.raw();
    raw.addContract(contract);
    const transaction = new Transaction();
    transaction.setRawData(raw);
    return transaction;
};

// wallet/createtransaction for sendTrx
const buildTransferContract = (value, options) => {
    const { to_address, owner_address, amount } = value;
    const transferContract = new TransferContract();
    transferContract.setToAddress(fromHexString(to_address));
    transferContract.setOwnerAddress(fromHexString(owner_address));
    transferContract.setAmount(amount);
    return buildCommonTransaction(
        transferContract,
        Transaction.Contract.ContractType.TRANSFERCONTRACT,
        'TransferContract',
        options.Permission_id
    );
};

// wallet/transferasset for sendToken
const buildTransferAssetContract = (value, options) => {
    const { to_address, owner_address, amount, asset_name } = value;
    const transferContract = new TransferAssetContract();
    transferContract.setToAddress(fromHexString(to_address));
    transferContract.setOwnerAddress(fromHexString(owner_address));
    transferContract.setAssetName(flexToUint8Array(asset_name, options.visible));
    transferContract.setAmount(amount);
    return buildCommonTransaction(
        transferContract,
        Transaction.Contract.ContractType.TRANSFERASSETCONTRACT,
        'TransferAssetContract',
        options.Permission_id
    );
};

// wallet/participateassetissue for purchaseToken
const buildParticipateAssetIssueContract = (value, options) => {
    const pbObj = new ParticipateAssetIssueContract();
    pbObj.setToAddress(fromHexString(value.to_address));
    pbObj.setOwnerAddress(fromHexString(value.owner_address));
    pbObj.setAssetName(flexToUint8Array(value.asset_name, options.visible));
    pbObj.setAmount(value.amount);

    return buildCommonTransaction(
        pbObj,
        Transaction.Contract.ContractType.PARTICIPATEASSETISSUECONTRACT,
        'ParticipateAssetIssueContract',
        options.Permission_id
    );
};

const buildTriggerSmartContract = (value, options) => {
    const triggerSmartContract = new TriggerSmartContract();
    const {
        owner_address,
        contract_address,
        parameter = '',
        function_selector,
        call_value,
        call_token_value,
        token_id,
        data,
    } = value;
    triggerSmartContract.setOwnerAddress(fromHexString(owner_address));
    triggerSmartContract.setContractAddress(fromHexString(contract_address));
    triggerSmartContract.setCallValue(call_value);
    if (data) {
        triggerSmartContract.setData(stringToUint8Array(data));
    } else if (function_selector) {
        const contractData = sha3(function_selector).substring(2, 10) + parameter;
        triggerSmartContract.setData(stringToUint8Array(contractData));
    }

    if (token_id) {
        triggerSmartContract.setTokenId(token_id);
    }
    if (call_token_value) {
        triggerSmartContract.setCallTokenValue(call_token_value);
    }

    return buildCommonTransaction(
        triggerSmartContract,
        Transaction.Contract.ContractType.TRIGGERSMARTCONTRACT,
        'TriggerSmartContract',
        options.Permission_id
    );
};

const buildFreezeBalanceContract = (value, options) => {
    const freezeBalanceContract = new FreezeBalanceContract();
    const { owner_address, frozen_balance, frozen_duration, resource, receiver_address } = value;
    freezeBalanceContract.setOwnerAddress(fromHexString(owner_address));
    freezeBalanceContract.setFrozenBalance(frozen_balance);
    freezeBalanceContract.setFrozenDuration(frozen_duration);
    if (resource) {
        freezeBalanceContract.setResource(ResourceCode[resource]);
    }
    if (receiver_address) {
        freezeBalanceContract.setReceiverAddress(fromHexString(receiver_address));
    }

    return buildCommonTransaction(
        freezeBalanceContract,
        Transaction.Contract.ContractType.FREEZEBALANCECONTRACT,
        'FreezeBalanceContract',
        options.Permission_id
    );
};

const buildUnfreezeBalanceContract = (value, options) => {
    const unfreezeBalanceContract = new UnfreezeBalanceContract();
    const { owner_address, resource, receiver_address } = value;
    unfreezeBalanceContract.setOwnerAddress(fromHexString(owner_address));
    if (resource) {
        unfreezeBalanceContract.setResource(ResourceCode[resource]);
    }
    if (receiver_address) {
        unfreezeBalanceContract.setReceiverAddress(fromHexString(receiver_address));
    }

    return buildCommonTransaction(
        unfreezeBalanceContract,
        Transaction.Contract.ContractType.UNFREEZEBALANCECONTRACT,
        'UnfreezeBalanceContract',
        options.Permission_id
    );
};

const buildWithdrawBalanceContract = (value, options) => {
    const withdrawbalanceContract = new WithdrawBalanceContract();
    const { owner_address } = value;
    withdrawbalanceContract.setOwnerAddress(fromHexString(owner_address));

    return buildCommonTransaction(
        withdrawbalanceContract,
        Transaction.Contract.ContractType.WITHDRAWBALANCECONTRACT,
        'WithdrawBalanceContract',
        options.Permission_id
    );
};

const buildFreezeBalanceV2Contract = (value, options) => {
    const freezeBalanceV2Contract = new FreezeBalanceV2Contract();
    const { owner_address, frozen_balance, resource } = value;
    freezeBalanceV2Contract.setOwnerAddress(fromHexString(owner_address));
    freezeBalanceV2Contract.setFrozenBalance(frozen_balance);
    freezeBalanceV2Contract.setResource(ResourceCode[resource]);

    return buildCommonTransaction(
        freezeBalanceV2Contract,
        Transaction.Contract.ContractType.FREEZEBALANCEV2CONTRACT,
        'FreezeBalanceV2Contract',
        options.Permission_id
    );
};

const buildCancelFreezeBalanceV2Contract = (value, options) => {
    const cancelAllUnfreezeV2Contract = new CancelAllUnfreezeV2Contract();
    const { owner_address } = value;
    cancelAllUnfreezeV2Contract.setOwnerAddress(fromHexString(owner_address));

    return buildCommonTransaction(
        cancelAllUnfreezeV2Contract,
        Transaction.Contract.ContractType.CANCELALLUNFREEZEV2CONTRACT,
        'CancelAllUnfreezeV2Contract',
        options.Permission_id
    );
};

const buildUnfreezeBalanceV2Contract = (value, options) => {
    const unfreezeBalanceV2Contract = new UnfreezeBalanceV2Contract();
    const { owner_address, unfreeze_balance, resource } = value;
    unfreezeBalanceV2Contract.setOwnerAddress(fromHexString(owner_address));
    unfreezeBalanceV2Contract.setUnfreezeBalance(unfreeze_balance);
    unfreezeBalanceV2Contract.setResource(ResourceCode[resource]);

    return buildCommonTransaction(
        unfreezeBalanceV2Contract,
        Transaction.Contract.ContractType.UNFREEZEBALANCEV2CONTRACT,
        'UnfreezeBalanceV2Contract',
        options.Permission_id
    );
};

const buildDelegateResourceContract = (value, options) => {
    const delegateResourceContract = new DelegateResourceContract();
    const { owner_address, receiver_address, balance, resource, lock = false, lock_period } = value;
    delegateResourceContract.setOwnerAddress(fromHexString(owner_address));
    delegateResourceContract.setBalance(balance);
    delegateResourceContract.setResource(ResourceCode[resource]);
    delegateResourceContract.setLock(lock);
    delegateResourceContract.setLockPeriod(lock_period);
    delegateResourceContract.setReceiverAddress(fromHexString(receiver_address));

    return buildCommonTransaction(
        delegateResourceContract,
        Transaction.Contract.ContractType.DELEGATERESOURCECONTRACT,
        'DelegateResourceContract',
        options.Permission_id
    );
};

const buildUnDelegateResourceContract = (value, options) => {
    const unDelegateResourceContract = new UnDelegateResourceContract();
    const { owner_address, receiver_address, balance, resource } = value;
    unDelegateResourceContract.setOwnerAddress(fromHexString(owner_address));
    unDelegateResourceContract.setBalance(balance);
    unDelegateResourceContract.setResource(ResourceCode[resource]);
    unDelegateResourceContract.setReceiverAddress(fromHexString(receiver_address));

    return buildCommonTransaction(
        unDelegateResourceContract,
        Transaction.Contract.ContractType.UNDELEGATERESOURCECONTRACT,
        'UnDelegateResourceContract',
        options.Permission_id
    );
};

const buildWithdrawExpireUnfreezeContract = (value, options) => {
    const withdrawExpireUnfreeze = new WithdrawExpireUnfreezeContract();
    const { owner_address } = value;
    withdrawExpireUnfreeze.setOwnerAddress(fromHexString(owner_address));

    return buildCommonTransaction(
        withdrawExpireUnfreeze,
        Transaction.Contract.ContractType.WITHDRAWEXPIREUNFREEZECONTRACT,
        'WithdrawExpireUnfreezeContract',
        options.Permission_id
    );
};

// applyForSR
const buildCreateWitness = (value, options) => {
    const createWitnessContract = new WitnessCreateContract();
    const { owner_address, url } = value;
    createWitnessContract.setOwnerAddress(fromHexString(owner_address));
    createWitnessContract.setUrl(stringToUint8Array(url.replace(/^0x/, '')));
    return buildCommonTransaction(
        createWitnessContract,
        Transaction.Contract.ContractType.WITNESSCREATECONTRACT,
        'WitnessCreateContract',
        options.Permission_id
    );
};

// vote
const buildVoteWitnessAccount = (value, options) => {
    const voteWitnessContract = new VoteWitnessContract();
    const { owner_address, votes } = value;
    voteWitnessContract.setOwnerAddress(fromHexString(owner_address));

    votes.forEach((voteItem) => {
        const vote = new VoteWitnessContract.Vote();
        const { vote_address, vote_count } = voteItem;
        vote.setVoteAddress(fromHexString(vote_address));
        const numberOfVotes = parseInt(vote_count);
        vote.setVoteCount(numberOfVotes);
        voteWitnessContract.addVotes(vote);
    });

    return buildCommonTransaction(
        voteWitnessContract,
        Transaction.Contract.ContractType.VOTEWITNESSCONTRACT,
        'VoteWitnessContract',
        options.Permission_id
    );
};

const buildCreateSmartContract = (value, options) => {
    const params = value?.new_contract
        ? {
              ...{
                  owner_address: value.owner_address,
                  call_token_value: value.call_token_value,
                  token_id: value.token_id,
              },
              ...value.new_contract,
          }
        : value;
    const {
        owner_address,
        consume_user_resource_percent,
        origin_energy_limit,
        abi,
        bytecode = '',
        parameter = '',
        call_value,
        call_token_value,
        token_id,
        name: contracName,
    } = params;
    let { origin_address } = params;

    const createSmartContract = new CreateSmartContract();
    createSmartContract.setOwnerAddress(fromHexString(owner_address));
    if (token_id) {
        createSmartContract.setTokenId(token_id);
    }
    if (call_token_value) {
        createSmartContract.setCallTokenValue(call_token_value);
    }
    const smartContractBuilder = new SmartContract();

    if (abi) {
        let abiJson;
        if (typeof abi === 'string') {
            abiJson = JSON.parse(abi);
        } else {
            abiJson = abi?.entrys || []; // abi could be an empty object if origin abi is `[]`;
        }
        const abiBuilder = new SmartContract.ABI();

        const buildEntryParam = (data) => {
            const param = new SmartContract.ABI.Entry.Param();
            const { indexed, name, type } = data;
            if (indexed === true) {
                param.setIndexed(true);
            }
            param.setName(name);
            param.setType(type);
            return param;
        };
        const entryBuilders = abiJson.map((entry) => {
            const { anonymous, constant, name, inputs, outputs, type, payable, stateMutability } = entry;
            const entryBuilder = new SmartContract.ABI.Entry();
            entryBuilder.setAnonymous(anonymous);
            entryBuilder.setConstant(constant);
            entryBuilder.setName(name);
            if (inputs) {
                entryBuilder.setInputsList(inputs.map((input) => buildEntryParam(input)));
            }
            if (outputs) {
                entryBuilder.setOutputsList(outputs.map((output) => buildEntryParam(output)));
            }
            if (type) {
                entryBuilder.setType(SmartContract.ABI.Entry.EntryType[type.toUpperCase()]);
            }

            entryBuilder.setPayable(payable);
            if (stateMutability) {
                entryBuilder.setStatemutability(SmartContract.ABI.Entry.StateMutabilityType[stateMutability.toUpperCase()]);
            }

            return entryBuilder;
        });
        abiBuilder.setEntrysList(entryBuilders);
        smartContractBuilder.setAbi(abiBuilder);
    }

    if (call_value) {
        smartContractBuilder.setCallValue(call_value);
    }

    smartContractBuilder.setConsumeUserResourcePercent(consume_user_resource_percent);
    smartContractBuilder.setOriginEnergyLimit(origin_energy_limit);

    if (!origin_address) {
        origin_address = owner_address;
    }
    smartContractBuilder.setOriginAddress(fromHexString(origin_address));

    if (bytecode) {
        const bytecodeParameter = bytecode.replace(/^0x/, '') + parameter.replace(/^0x/, '');
        smartContractBuilder.setBytecode(stringToUint8Array(bytecodeParameter));
    }

    smartContractBuilder.setName(contracName);

    createSmartContract.setNewContract(smartContractBuilder);

    return buildCommonTransaction(
        createSmartContract,
        Transaction.Contract.ContractType.CREATESMARTCONTRACT,
        'CreateSmartContract',
        options.Permission_id
    );
};

const buildClearABIContract = (value, options) => {
    const { contract_address, owner_address } = value;
    const clearABIContract = new ClearABIContract();
    clearABIContract.setOwnerAddress(fromHexString(owner_address));
    clearABIContract.setContractAddress(fromHexString(contract_address));

    return buildCommonTransaction(
        clearABIContract,
        Transaction.Contract.ContractType.CLEARABICONTRACT,
        'ClearABIContract',
        options.Permission_id
    );
};

// updateBrokerage
const buildUpdateBrokerageContract = (value, options) => {
    const { brokerage, owner_address } = value;
    const updateBrokerageContract = new UpdateBrokerageContract();
    updateBrokerageContract.setOwnerAddress(fromHexString(owner_address));
    updateBrokerageContract.setBrokerage(brokerage);

    return buildCommonTransaction(
        updateBrokerageContract,
        Transaction.Contract.ContractType.UPDATEBROKERAGECONTRACT,
        'UpdateBrokerageContract',
        options.Permission_id
    );
};

// createToken
const buildAssetIssueContract = (value, options) => {
    const {
        owner_address,
        name,
        abbr,
        description,
        url,
        total_supply,
        trx_num,
        num,
        start_time,
        end_time,
        precision,
        free_asset_net_limit,
        public_free_asset_net_limit,
        public_free_asset_net_usage = 0,
        public_latest_free_net_time = 0,
        vote_score = 0,
        frozen_supply,
    } = value;
    const assetIssueContract = new AssetIssueContract();
    assetIssueContract.setOwnerAddress(fromHexString(owner_address));
    if (name) {
        assetIssueContract.setName(stringToUint8Array(name.replace(/^0x/, '')));
    }
    if (abbr) {
        assetIssueContract.setAbbr(stringToUint8Array(abbr.replace(/^0x/, '')));
    }
    assetIssueContract.setTotalSupply(total_supply);
    assetIssueContract.setNum(num);
    assetIssueContract.setEndTime(end_time);
    assetIssueContract.setStartTime(start_time);
    assetIssueContract.setTrxNum(trx_num);
    assetIssueContract.setVoteScore(vote_score);
    if (precision) {
        assetIssueContract.setPrecision(precision);
    }
    if (public_latest_free_net_time) {
        assetIssueContract.setPublicLatestFreeNetTime(public_latest_free_net_time);
    }
    if (description) {
        assetIssueContract.setDescription(stringToUint8Array(description.replace(/^0x/, '')));
    }
    if (url) {
        assetIssueContract.setUrl(stringToUint8Array(url.replace(/^0x/, '')));
    }

    assetIssueContract.setPublicFreeAssetNetUsage(public_free_asset_net_usage);
    assetIssueContract.setFreeAssetNetLimit(free_asset_net_limit);
    assetIssueContract.setPublicFreeAssetNetLimit(public_free_asset_net_limit);
    if (frozen_supply) {
        const frozenSupplyContract = new AssetIssueContract.FrozenSupply();
        frozenSupplyContract.setFrozenAmount(frozen_supply.length ? frozen_supply[0].frozen_amount : frozen_supply.frozen_amount);
        frozenSupplyContract.setFrozenDays(frozen_supply.length ? frozen_supply[0].frozen_days : frozen_supply.frozen_days);
        assetIssueContract.addFrozenSupply(frozenSupplyContract);
    }
    return buildCommonTransaction(
        assetIssueContract,
        Transaction.Contract.ContractType.ASSETISSUECONTRACT,
        'AssetIssueContract',
        options.Permission_id
    );
};

//createAccount
const buildAccountCreateContract = (value, options) => {
    const accountCreateContract = new AccountCreateContract();
    const { account_address, owner_address } = value;
    accountCreateContract.setOwnerAddress(fromHexString(owner_address));
    accountCreateContract.setAccountAddress(fromHexString(account_address.replace(/^0x/, '')));
    return buildCommonTransaction(
        accountCreateContract,
        Transaction.Contract.ContractType.ACCOUNTCREATECONTRACT,
        'AccountCreateContract',
        options.Permission_id
    );
};

// updateAccount
const buildAccountUpdateContract = (value, options) => {
    const accountUpdateContract = new AccountUpdateContract();
    const { account_name, owner_address } = value;
    accountUpdateContract.setOwnerAddress(fromHexString(owner_address));
    accountUpdateContract.setAccountName(stringToUint8Array(account_name.replace(/^0x/, '')));
    return buildCommonTransaction(
        accountUpdateContract,
        Transaction.Contract.ContractType.ACCOUNTUPDATECONTRACT,
        'AccountUpdateContract',
        options.Permission_id
    );
};

// setAccountId
const buildSetAccountIdContract = (value, options) => {
    const setAccountIdContract = new SetAccountIdContract();
    const { account_id, owner_address } = value;
    setAccountIdContract.setOwnerAddress(fromHexString(owner_address));
    setAccountIdContract.setAccountId(stringToUint8Array(account_id.replace(/^0x/, '')));
    return buildCommonTransaction(
        setAccountIdContract,
        Transaction.Contract.ContractType.SETACCOUNTIDCONTRACT,
        'SetAccountIdContract',
        options.Permission_id
    );
};

const buildProposalCreateContract = (value, options) => {
    const proposalCreateContract = new ProposalCreateContract();
    const { owner_address, parameters } = value;
    proposalCreateContract.setOwnerAddress(fromHexString(owner_address));
    parameters.forEach((parameter) => {
        proposalCreateContract.getParametersMap().set(parameter.key, parameter.value);
    });
    return buildCommonTransaction(
        proposalCreateContract,
        Transaction.Contract.ContractType.PROPOSALCREATECONTRACT,
        'ProposalCreateContract',
        options.Permission_id
    );
};

const buildProposalDeleteContract = (value, options) => {
    const proposalDeleteContract = new ProposalDeleteContract();
    const { owner_address, proposal_id } = value;
    proposalDeleteContract.setOwnerAddress(fromHexString(owner_address));
    proposalDeleteContract.setProposalId(proposal_id);
    return buildCommonTransaction(
        proposalDeleteContract,
        Transaction.Contract.ContractType.PROPOSALDELETECONTRACT,
        'ProposalDeleteContract',
        options.Permission_id
    );
};

const buildVoteProposalContract = (value, options) => {
    const proposalVoteContract = new ProposalApproveContract();
    const { owner_address, proposal_id, is_add_approval } = value;
    proposalVoteContract.setOwnerAddress(fromHexString(owner_address));
    proposalVoteContract.setProposalId(proposal_id);
    proposalVoteContract.setIsAddApproval(is_add_approval);
    return buildCommonTransaction(
        proposalVoteContract,
        Transaction.Contract.ContractType.PROPOSALAPPROVECONTRACT,
        'ProposalApproveContract',
        options.Permission_id
    );
};

const buildExchangeCreateContract = (value, options) => {
    const exchangeCreateContract = new ExchangeCreateContract();
    const { owner_address, first_token_id, first_token_balance, second_token_id, second_token_balance } = value;
    exchangeCreateContract.setOwnerAddress(fromHexString(owner_address));
    exchangeCreateContract.setFirstTokenId(flexToUint8Array(first_token_id, options.visible));
    exchangeCreateContract.setFirstTokenBalance(first_token_balance);
    exchangeCreateContract.setSecondTokenId(flexToUint8Array(second_token_id, options.visible));
    exchangeCreateContract.setSecondTokenBalance(second_token_balance);
    return buildCommonTransaction(
        exchangeCreateContract,
        Transaction.Contract.ContractType.EXCHANGECREATECONTRACT,
        'ExchangeCreateContract',
        options.Permission_id
    );
};

const buildExchangeInjectContract = (value, options) => {
    const exchangeInjectContract = new ExchangeInjectContract();
    const { owner_address, exchange_id, token_id, quant } = value;
    exchangeInjectContract.setOwnerAddress(fromHexString(owner_address));
    exchangeInjectContract.setExchangeId(exchange_id);
    exchangeInjectContract.setTokenId(flexToUint8Array(token_id, options.visible));
    exchangeInjectContract.setQuant(quant);
    return buildCommonTransaction(
        exchangeInjectContract,
        Transaction.Contract.ContractType.EXCHANGEINJECTCONTRACT,
        'ExchangeInjectContract',
        options.Permission_id
    );
};

const buildExchangeWithdrawContract = (value, options) => {
    const exchangeWithdrawContract = new ExchangeWithdrawContract();
    const { owner_address, exchange_id, token_id, quant } = value;
    exchangeWithdrawContract.setOwnerAddress(fromHexString(owner_address));
    exchangeWithdrawContract.setExchangeId(exchange_id);
    exchangeWithdrawContract.setTokenId(flexToUint8Array(token_id, options.visible));
    exchangeWithdrawContract.setQuant(quant);
    return buildCommonTransaction(
        exchangeWithdrawContract,
        Transaction.Contract.ContractType.EXCHANGEWITHDRAWCONTRACT,
        'ExchangeWithdrawContract',
        options.Permission_id
    );
};

const buildExchangeTransactionContract = (value, options) => {
    const exchangeTransactionContract = new ExchangeTransactionContract();
    const { owner_address, exchange_id, token_id, quant, expected } = value;
    exchangeTransactionContract.setOwnerAddress(fromHexString(owner_address));
    exchangeTransactionContract.setExchangeId(exchange_id);
    exchangeTransactionContract.setTokenId(flexToUint8Array(token_id, options.visible));
    exchangeTransactionContract.setQuant(quant);
    exchangeTransactionContract.setExpected(expected);
    return buildCommonTransaction(
        exchangeTransactionContract,
        Transaction.Contract.ContractType.EXCHANGETRANSACTIONCONTRACT,
        'ExchangeTransactionContract',
        options.Permission_id
    );
};

const buildUpdateSettingContract = (value, options) => {
    const updateSettingContract = new UpdateSettingContract();
    const { owner_address, contract_address, consume_user_resource_percent } = value;
    updateSettingContract.setOwnerAddress(fromHexString(owner_address));
    updateSettingContract.setContractAddress(fromHexString(contract_address));
    updateSettingContract.setConsumeUserResourcePercent(consume_user_resource_percent);
    return buildCommonTransaction(
        updateSettingContract,
        Transaction.Contract.ContractType.UPDATESETTINGCONTRACT,
        'UpdateSettingContract',
        options.Permission_id
    );
};

const buildUpdateEnergyLimitContract = (value, options) => {
    const updateEnergyLimitContract = new UpdateEnergyLimitContract();
    const { owner_address, contract_address, origin_energy_limit } = value;
    updateEnergyLimitContract.setOwnerAddress(fromHexString(owner_address));
    updateEnergyLimitContract.setContractAddress(fromHexString(contract_address));
    updateEnergyLimitContract.setOriginEnergyLimit(origin_energy_limit);
    return buildCommonTransaction(
        updateEnergyLimitContract,
        Transaction.Contract.ContractType.UPDATEENERGYLIMITCONTRACT,
        'UpdateEnergyLimitContract',
        options.Permission_id
    );
};

const buildAccountPermissionUpdateContract = (value, options) => {
    const accountPermissionUpdateContract = new AccountPermissionUpdateContract();
    const { owner_address, owner, witness, actives } = value;
    accountPermissionUpdateContract.setOwnerAddress(fromHexString(owner_address));
    const getType = (type) => {
        // no type when permission_name is owner
        if (isNaN(type)) return type === 'Active' ? 2 : type === 'Witness' ? 1 : 0;
        return type;
    };
    const buildPermission = (data) => {
        // no type when permission_name is owner
        const permission = new Permission();
        const { type, id, permission_name, threshold, parentId, operations, keys } = data;
        permission.setType(getType(type));
        permission.setId(id);
        permission.setPermissionName(permission_name);
        permission.setThreshold(threshold);
        if (parentId) {
            permission.setParentId(parentId);
        }
        if (operations) {
            permission.setOperations(stringToUint8Array(operations));
        }
        if (keys) {
            permission.setKeysList(
                keys.map((key) => {
                    const keyBuilder = new Key();
                    keyBuilder.setAddress(fromHexString(key.address));
                    keyBuilder.setWeight(key.weight);
                    return keyBuilder;
                })
            );
        }
        return permission;
    };
    if (owner) {
        accountPermissionUpdateContract.setOwner(buildPermission(owner));
    }
    if (witness) {
        accountPermissionUpdateContract.setWitness(buildPermission(witness));
    }
    if (actives) {
        if (Array.isArray(actives)) {
            accountPermissionUpdateContract.setActivesList(actives.map((active) => buildPermission(active)));
        } else {
            accountPermissionUpdateContract.setActivesList([buildPermission(actives)]);
        }
    }
    return buildCommonTransaction(
        accountPermissionUpdateContract,
        Transaction.Contract.ContractType.ACCOUNTPERMISSIONUPDATECONTRACT,
        'AccountPermissionUpdateContract',
        options.Permission_id
    );
};

const buildUpdateAssetContract = (value, options) => {
    const updateAssetContract = new UpdateAssetContract();
    const { owner_address, description, url, new_limit, new_public_limit } = value;
    updateAssetContract.setOwnerAddress(fromHexString(owner_address));
    if (description) {
        updateAssetContract.setDescription(stringToUint8Array(description.replace(/^0x/, '')));
    }
    if (url) {
        updateAssetContract.setUrl(stringToUint8Array(url.replace(/^0x/, '')));
    }
    if (new_limit) {
        updateAssetContract.setNewLimit(new_limit);
    }
    if (new_public_limit) {
        updateAssetContract.setNewPublicLimit(new_public_limit);
    }
    return buildCommonTransaction(
        updateAssetContract,
        Transaction.Contract.ContractType.UPDATEASSETCONTRACT,
        'UpdateAssetContract',
        options.Permission_id
    );
};

const contractJsonToProtobuf = (contract, value, options) => {
    switch (contract.type) {
        case 'TransferContract':
            return buildTransferContract(value, options);
        case 'TransferAssetContract':
            return buildTransferAssetContract(value, options);
        case 'ParticipateAssetIssueContract':
            return buildParticipateAssetIssueContract(value, options);
        case 'TriggerSmartContract':
            return buildTriggerSmartContract(value, options);
        case 'FreezeBalanceContract':
            return buildFreezeBalanceContract(value, options);
        case 'UnfreezeBalanceContract':
            return buildUnfreezeBalanceContract(value, options);
        case 'WithdrawBalanceContract':
            return buildWithdrawBalanceContract(value, options);
        case 'FreezeBalanceV2Contract':
            return buildFreezeBalanceV2Contract(value, options);
        case 'CancelAllUnfreezeV2Contract':
            return buildCancelFreezeBalanceV2Contract(value, options);
        case 'UnfreezeBalanceV2Contract':
            return buildUnfreezeBalanceV2Contract(value, options);
        case 'DelegateResourceContract':
            return buildDelegateResourceContract(value, options);
        case 'UnDelegateResourceContract':
            return buildUnDelegateResourceContract(value, options);
        case 'WithdrawExpireUnfreezeContract':
            return buildWithdrawExpireUnfreezeContract(value, options);
        case 'WitnessCreateContract':
            return buildCreateWitness(value, options);
        case 'VoteWitnessContract':
            return buildVoteWitnessAccount(value, options);
        case 'CreateSmartContract':
            return buildCreateSmartContract(value, options);
        case 'ClearABIContract':
            return buildClearABIContract(value, options);
        case 'UpdateBrokerageContract':
            return buildUpdateBrokerageContract(value, options);
        case 'AssetIssueContract':
            return buildAssetIssueContract(value, options);
        case 'AccountCreateContract':
            return buildAccountCreateContract(value, options);
        case 'AccountUpdateContract':
            return buildAccountUpdateContract(value, options);
        case 'SetAccountIdContract':
            return buildSetAccountIdContract(value, options);
        case 'ProposalCreateContract':
            return buildProposalCreateContract(value, options);
        case 'ProposalDeleteContract':
            return buildProposalDeleteContract(value, options);
        case 'ProposalApproveContract':
            return buildVoteProposalContract(value, options);
        case 'ExchangeCreateContract':
            return buildExchangeCreateContract(value, options);
        case 'ExchangeInjectContract':
            return buildExchangeInjectContract(value, options);
        case 'ExchangeWithdrawContract':
            return buildExchangeWithdrawContract(value, options);
        case 'ExchangeTransactionContract':
            return buildExchangeTransactionContract(value, options);
        case 'UpdateSettingContract':
            return buildUpdateSettingContract(value, options);
        case 'UpdateEnergyLimitContract':
            return buildUpdateEnergyLimitContract(value, options);
        case 'AccountPermissionUpdateContract':
            return buildAccountPermissionUpdateContract(value, options);
        case 'UpdateAssetContract':
            return buildUpdateAssetContract(value, options);
    }
};

const txJsonToPb = (transaction) => {
    const rawData = transaction['raw_data'];
    const contractJson = rawData.contract[0];
    const data = contractJson.parameter.value;
    const options = { Permission_id: contractJson.Permission_id, visible: transaction.visible };
    const transactionObj = contractJsonToProtobuf(contractJson, data, options) as any;

    const rawDataObj = transactionObj.getRawData();
    rawDataObj.setRefBlockBytes(stringToUint8Array(rawData.ref_block_bytes));
    rawDataObj.setRefBlockHash(stringToUint8Array(rawData.ref_block_hash));
    if (rawData.data) {
        rawDataObj.setData(stringToUint8Array(rawData.data));
    }

    if (rawData.fee_limit) {
        rawDataObj.setFeeLimit(rawData.fee_limit);
    }

    if (rawData.expiration) {
        rawDataObj.setExpiration(rawData.expiration);
    }

    if (rawData.timestamp) {
        rawDataObj.setTimestamp(rawData.timestamp);
    }

    transactionObj.setRawData(rawDataObj);

    return transactionObj;
};

const txJsonToPbWithArgs = (transaction, args: any = {}, options: any = {}) => {
    const rawData = transaction['raw_data'];
    const contractJson = rawData.contract[0];

    const transactionObj = contractJsonToProtobuf(contractJson, args, {
        Permission_id: args?.Permission_id,
    }) as any;

    const rawDataObj = transactionObj.getRawData();
    rawDataObj.setRefBlockBytes(stringToUint8Array(rawData.ref_block_bytes));
    rawDataObj.setRefBlockHash(stringToUint8Array(rawData.ref_block_hash));
    // for memo
    if (options.data) {
        rawDataObj.setData(stringToUint8Array(options.data.replace(/^0x/, '')));
    }

    if (options.fee_limit || args.fee_limit) {
        rawDataObj.setFeeLimit(options.fee_limit || args.fee_limit);
    }

    if (rawData.expiration) {
        rawDataObj.setExpiration(rawData.expiration);
    }

    if (rawData.timestamp) {
        rawDataObj.setTimestamp(rawData.timestamp);
    }

    transactionObj.setRawData(rawDataObj);

    return transactionObj;
};

const compareTransaction = (transaction, transactionPb) => {
    const rawDataBytes = transactionPb.getRawData().serializeBinary();
    const rawDataHex = byteArray2hexStr(rawDataBytes);
    const txID = sha256(rawDataBytes);
    return (
        rawDataHex.toLowerCase() === transaction.raw_data_hex.toLowerCase() &&
        txID.replace(/^0x/, '').toLowerCase() === transaction.txID.replace(/^0x/, '').toLowerCase()
    );
};

const txPbToRawDataHex = (pb) => {
    return byteArray2hexStr(pb.getRawData().serializeBinary());
};

const txCheck = (transaction) => {
    const transactionPb = txJsonToPb(transaction);
    return compareTransaction(transaction, transactionPb);
};

const txCheckWithArgs = (transaction, args, options) => {
    const transactionPb = txJsonToPbWithArgs(transaction, args, options);
    return compareTransaction(transaction, transactionPb);
};

const txPbToTxID = (transactionPb) => {
    const rawDataBytes = transactionPb.getRawData().serializeBinary();
    const txID = sha256(rawDataBytes);
    return txID;
};


const ContractTypeMap = {
    '0': 'AccountCreateContract',
    '1': 'TransferContract',
    '2': 'TransferAssetContract',
    '4': 'VoteWitnessContract',
    '5': 'WitnessCreateContract',
    '6': 'AssetIssueContract',
    '9': 'ParticipateAssetIssueContract',
    '10': 'AccountUpdateContract',
    '11': 'FreezeBalanceContract',
    '12': 'UnfreezeBalanceContract',
    '13': 'WithdrawBalanceContract',
    '15': 'UpdateAssetContract',
    '16': 'ProposalCreateContract',
    '17': 'ProposalApproveContract',
    '18': 'ProposalDeleteContract',
    '19': 'SetAccountIdContract',
    '30': 'CreateSmartContract',
    '31': 'TriggerSmartContract',
    '33': 'UpdateSettingContract',
    '41': 'ExchangeCreateContract',
    '42': 'ExchangeInjectContract',
    '43': 'ExchangeWithdrawContract',
    '44': 'ExchangeTransactionContract',
    '45': 'UpdateEnergyLimitContract',
    '46': 'AccountPermissionUpdateContract',
    '48': 'ClearABIContract',
    '49': 'UpdateBrokerageContract',
    '54': 'FreezeBalanceV2Contract',
    '55': 'UnfreezeBalanceV2Contract',
    '56': 'WithdrawExpireUnfreezeContract',
    '57': 'DelegateResourceContract',
    '58': 'UnDelegateResourceContract',
    '59': 'CancelAllUnfreezeV2Contract',
};

const getAuthsList = (pb) => {
    const authsList = pb.getAuthsList();
    return authsList.map((authPb) => {
        const permission_name = byteArray2hexStr(authPb.getPermissionName_asU8());
        const accountPb = authPb.getAccount();
        const account = {
            name: byteArray2hexStr(accountPb.getName_asU8()),
            address: byteArray2hexStr(accountPb.getAddress_asU8()),
        };
        return {
            permission_name,
            account,
        };
    });
}

const DCommonData = (type: string, rawDataHex: string) => {
    const pb = Transaction.raw.deserializeBinary(hexStr2byteArray(rawDataHex));
    const contract = pb.getContractList()[0];
    const valuePb = contract.getParameter().getValue();
    const contractType = ContractTypeMap[contract.getType()];
    if (type !== contractType) {
        throw new Error(`type ${type} dismatches with rawDataHex type ${contractType}`);
    }
    return [
        {
            contract: [
                {
                    parameter: {
                        value: {},
                        type_url: contract.getParameter().getTypeUrl(),
                    },
                    type,
                    Permission_id: contract.getPermissionId(),
                },
            ],
            data: byteArray2hexStr(pb.getData()),
            fee_limit: pb.getFeeLimit(),
            ref_block_bytes: byteArray2hexStr(pb.getRefBlockBytes_asU8()),
            ref_block_hash: byteArray2hexStr(pb.getRefBlockHash_asU8()),
            expiration: pb.getExpiration(),
            timestamp: pb.getTimestamp(),
            scripts: byteArray2hexStr(pb.getScripts_asU8()),
            auths: getAuthsList(pb),
        },
        valuePb,
    ];
};

const DTriggerSmartContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const triggerSmartContract = TriggerSmartContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(triggerSmartContract.getOwnerAddress_asU8()),
        contract_address: byteArray2hexStr(triggerSmartContract.getContractAddress_asU8()),
        call_value: triggerSmartContract.getCallValue(),
        data: byteArray2hexStr(triggerSmartContract.getData_asU8()),
        call_token_value: triggerSmartContract.getCallTokenValue(),
        token_id: triggerSmartContract.getTokenId(),
    };
    return commonData;
};

const getResourceName = (type) => {
    switch (type) {
        case 0:
            return 'BANDWIDTH';
        case 1:
            return 'ENERGY';
        default:
            return 'BANDWIDTH';
    }
};

const DFreezeBalanceV2Contract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const freezeBalanceV2Contract = FreezeBalanceV2Contract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(freezeBalanceV2Contract.getOwnerAddress_asU8()),
        frozen_balance: freezeBalanceV2Contract.getFrozenBalance(),
        resource: getResourceName(freezeBalanceV2Contract.getResource()),
    };
    
    return commonData;
};

const DUnfreezeBalanceV2Contract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const unfreezeBalanceV2Contract = UnfreezeBalanceV2Contract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(unfreezeBalanceV2Contract.getOwnerAddress_asU8()),
        unfreeze_balance: unfreezeBalanceV2Contract.getUnfreezeBalance(),
        resource: getResourceName(unfreezeBalanceV2Contract.getResource()),
    };
    return commonData;
};

const DCancelAllUnfreezeV2Contract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const cancelAllUnfreezeV2Contract = CancelAllUnfreezeV2Contract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(cancelAllUnfreezeV2Contract.getOwnerAddress_asU8()),
    };
    return commonData;
};

const DDelegateResourceContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const delegateResourceContract = DelegateResourceContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(delegateResourceContract.getOwnerAddress_asU8()),
        balance: delegateResourceContract.getBalance(),
        lock: delegateResourceContract.getLock(),
        lock_period: delegateResourceContract.getLockPeriod(),
        receiver_address: byteArray2hexStr(delegateResourceContract.getReceiverAddress_asU8()),
        resource: getResourceName(delegateResourceContract.getResource())
    };
    return commonData;
};

const DUnDelegateResourceContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const undelegateResourceContract = UnDelegateResourceContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(undelegateResourceContract.getOwnerAddress_asU8()),
        balance: undelegateResourceContract.getBalance(),
        receiver_address: byteArray2hexStr(undelegateResourceContract.getReceiverAddress_asU8()),
        resource: getResourceName(undelegateResourceContract.getResource()),
    };
    return commonData;
};

const DWithdrawExpireUnfreezeContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const withdrawExpireUnfreezeContract = WithdrawExpireUnfreezeContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(withdrawExpireUnfreezeContract.getOwnerAddress_asU8()),
    };
    return commonData;
};

const DeserializeTransaction = (type: string, rawDataHex: string) => {
    if (!rawDataHex) {
        throw new Error('rawDataHex cannot be empty');
    }
    if (!isHex(rawDataHex)) {
        throw new Error('rawDataHex is not a valid hex string');
    }
    switch (type) {
        case 'TriggerSmartContract':
            return DTriggerSmartContract(type, rawDataHex);
        case 'FreezeBalanceV2Contract':
            return DFreezeBalanceV2Contract(type, rawDataHex);
        case 'UnfreezeBalanceV2Contract':
            return DUnfreezeBalanceV2Contract(type, rawDataHex);
        case 'CancelAllUnfreezeV2Contract':
            return DCancelAllUnfreezeV2Contract(type, rawDataHex);
        case 'DelegateResourceContract':
            return DDelegateResourceContract(type, rawDataHex);
        case 'UnDelegateResourceContract':
            return DUnDelegateResourceContract(type, rawDataHex);
        case 'WithdrawExpireUnfreezeContract':
            return DWithdrawExpireUnfreezeContract(type, rawDataHex);
        default:
            throw new Error(`trasaction ${type} not supported`);
    }
}

export { txJsonToPb, txPbToTxID, txPbToRawDataHex, txJsonToPbWithArgs, txCheckWithArgs, txCheck,
    DeserializeTransaction };
