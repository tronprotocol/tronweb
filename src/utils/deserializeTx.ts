// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import '../protocol/core/Tron_pb.cjs';
const { Transaction } = globalThis.TronWebProto;

import '../protocol/core/contract/balance_contract_pb.cjs';
const {
    TransferContract,
    WithdrawBalanceContract,
    WitnessCreateContract,
    FreezeBalanceV2Contract,
    UnfreezeBalanceV2Contract,
    CancelAllUnfreezeV2Contract,
    WithdrawExpireUnfreezeContract,
    DelegateResourceContract,
    UnDelegateResourceContract,
} = globalThis.TronWebProto;

import '../protocol/core/contract/smart_contract_pb.cjs';
const { TriggerSmartContract } = globalThis.TronWebProto;

import { byteArray2hexStr } from './bytes.js';
import { hexStr2byteArray } from './code.js';
import { isHex } from './validations.js';

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
};

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
        resource: getResourceName(delegateResourceContract.getResource()),
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

const DTransferContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const transferContract = TransferContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(transferContract.getOwnerAddress_asU8()),
        to_address: byteArray2hexStr(transferContract.getToAddress_asU8()),
        amount: transferContract.getAmount(),
    };
    return commonData;
};

const DWithdrawBalanceContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const withdrawBalanceContract = WithdrawBalanceContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(withdrawBalanceContract.getOwnerAddress_asU8()),
    };
    return commonData;
};

const DWitnessCreateContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const witnessCreateContract = WitnessCreateContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(witnessCreateContract.getOwnerAddress_asU8()),
        url: String.fromCharCode(...witnessCreateContract.getUrl_asU8()),
    };
    return commonData;
};

const deserializeTransaction = (type: string, rawDataHex: string) => {
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
        case 'TransferContract':
            return DTransferContract(type, rawDataHex);
        case 'WithdrawBalanceContract':
            return DWithdrawBalanceContract(type, rawDataHex);
        case 'WitnessCreateContract':
            return DWitnessCreateContract(type, rawDataHex);
        default:
            throw new Error(`trasaction ${type} not supported`);
    }
};

export { deserializeTransaction };
