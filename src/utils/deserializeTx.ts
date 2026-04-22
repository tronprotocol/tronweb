// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import '../protocol/core/Tron_pb.cjs';
const { Transaction, Permission, Key } = globalThis.TronWebProto;

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
    FreezeBalanceContract,
    UnfreezeBalanceContract,
} = globalThis.TronWebProto;

import '../protocol/core/contract/asset_issue_contract_pb.cjs';
const {
    TransferAssetContract,
    ParticipateAssetIssueContract,
    AssetIssueContract,
    UpdateAssetContract
} = globalThis.TronWebProto;

import '../protocol/core/contract/smart_contract_pb.cjs';
const {
    TriggerSmartContract,
    CreateSmartContract,
    UpdateSettingContract,
    UpdateEnergyLimitContract,
    ClearABIContract,
} = globalThis.TronWebProto;

import '../protocol/core/contract/account_contract_pb.cjs';
const {
    AccountCreateContract,
    AccountUpdateContract,
    SetAccountIdContract,
    AccountPermissionUpdateContract,
} = globalThis.TronWebProto;

import '../protocol/core/contract/witness_contract_pb.cjs';
const { VoteWitnessContract } = globalThis.TronWebProto;

import '../protocol/core/contract/proposal_contract_pb.cjs';
const {
    ProposalCreateContract,
    ProposalApproveContract,
    ProposalDeleteContract,
} = globalThis.TronWebProto;

import '../protocol/core/contract/exchange_contract_pb.cjs';
const {
    ExchangeCreateContract,
    ExchangeInjectContract,
    ExchangeWithdrawContract,
    ExchangeTransactionContract,
} = globalThis.TronWebProto;

import '../protocol/core/contract/storage_contract_pb.cjs';
const { UpdateBrokerageContract } = globalThis.TronWebProto;

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
        url: byteArray2hexStr(witnessCreateContract.getUrl_asU8()),
    };
    return commonData;
};

const DTransferAssetContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const transferAssetContract = TransferAssetContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(transferAssetContract.getOwnerAddress_asU8()),
        to_address: byteArray2hexStr(transferAssetContract.getToAddress_asU8()),
        asset_name: byteArray2hexStr(transferAssetContract.getAssetName_asU8()),
        amount: transferAssetContract.getAmount(),
    };
    return commonData;
};

const DParticipateAssetIssueContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const participateAssetIssueContract = ParticipateAssetIssueContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(participateAssetIssueContract.getOwnerAddress_asU8()),
        to_address: byteArray2hexStr(participateAssetIssueContract.getToAddress_asU8()),
        asset_name: byteArray2hexStr(participateAssetIssueContract.getAssetName_asU8()),
        amount: participateAssetIssueContract.getAmount(),
    };
    return commonData;
};

const DAssetIssueContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const assetIssueContract = AssetIssueContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(assetIssueContract.getOwnerAddress_asU8()),
        name: byteArray2hexStr(assetIssueContract.getName_asU8()),
        abbr: byteArray2hexStr(assetIssueContract.getAbbr_asU8()),
        description: byteArray2hexStr(assetIssueContract.getDescription_asU8()),
        url: byteArray2hexStr(assetIssueContract.getUrl_asU8()),
        total_supply: assetIssueContract.getTotalSupply(),
        trx_num: assetIssueContract.getTrxNum(),
        num: assetIssueContract.getNum(),
        start_time: assetIssueContract.getStartTime(),
        end_time: assetIssueContract.getEndTime(),
        frozen_supply: assetIssueContract.getFrozenSupplyList().map((frozenPb) => ({
            frozen_amount: frozenPb.getFrozenAmount(),
            frozen_days: frozenPb.getFrozenDays(),
        })),
        free_asset_net_limit: assetIssueContract.getFreeAssetNetLimit(),
        public_free_asset_net_limit: assetIssueContract.getPublicFreeAssetNetLimit(),
        precision: assetIssueContract.getPrecision(),
        vote_score: assetIssueContract.getVoteScore(),
    };
    return commonData;
};

const DUpdateAssetContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const updateAssetContract = UpdateAssetContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(updateAssetContract.getOwnerAddress_asU8()),
        description: byteArray2hexStr(updateAssetContract.getDescription_asU8()),
        url: byteArray2hexStr(updateAssetContract.getUrl_asU8()),
        new_limit: updateAssetContract.getNewLimit(),
        new_public_limit: updateAssetContract.getNewPublicLimit(),
    };
    return commonData;
};

// ============== Account contracts ==============

const PermissionType = {
    1: 'Witness',
    2: 'Active',
};

const deserializePermission = (permPb) => {
    if (!permPb) return null;
    const type = permPb.getType();
    return {
        permission_name: permPb.getPermissionName(),
        threshold: permPb.getThreshold(),
        operations: byteArray2hexStr(permPb.getOperations_asU8()),
        keys: permPb.getKeysList().map((keyPb) => ({
            address: byteArray2hexStr(keyPb.getAddress_asU8()),
            weight: keyPb.getWeight(),
        })),
        ...(type === 0 ? {} : {
            type: PermissionType[type],
            id: permPb.getId(),
        }),
    };
};

const DAccountCreateContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const accountCreateContract = AccountCreateContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(accountCreateContract.getOwnerAddress_asU8()),
        account_address: byteArray2hexStr(accountCreateContract.getAccountAddress_asU8()),
    };
    return commonData;
};

const DAccountUpdateContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const accountUpdateContract = AccountUpdateContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(accountUpdateContract.getOwnerAddress_asU8()),
        account_name: byteArray2hexStr(accountUpdateContract.getAccountName_asU8()),
    };
    return commonData;
};

const DSetAccountIdContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const setAccountIdContract = SetAccountIdContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(setAccountIdContract.getOwnerAddress_asU8()),
        account_id: byteArray2hexStr(setAccountIdContract.getAccountId_asU8()),
    };
    return commonData;
};

const DAccountPermissionUpdateContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const accountPermissionUpdateContract = AccountPermissionUpdateContract.deserializeBinary(valuePb);
    const witnessPb = accountPermissionUpdateContract.getWitness();
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(accountPermissionUpdateContract.getOwnerAddress_asU8()),
        owner: deserializePermission(accountPermissionUpdateContract.getOwner()),
        witness: witnessPb ? deserializePermission(witnessPb) : null,
        actives: accountPermissionUpdateContract.getActivesList().map(deserializePermission),
    };
    return commonData;
};

// ============== Stake 1.0 + Vote contracts ==============

const DFreezeBalanceContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const freezeBalanceContract = FreezeBalanceContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(freezeBalanceContract.getOwnerAddress_asU8()),
        frozen_balance: freezeBalanceContract.getFrozenBalance(),
        frozen_duration: freezeBalanceContract.getFrozenDuration(),
        resource: getResourceName(freezeBalanceContract.getResource()),
        receiver_address: byteArray2hexStr(freezeBalanceContract.getReceiverAddress_asU8()),
    };
    return commonData;
};

const DUnfreezeBalanceContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const unfreezeBalanceContract = UnfreezeBalanceContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(unfreezeBalanceContract.getOwnerAddress_asU8()),
        resource: getResourceName(unfreezeBalanceContract.getResource()),
        receiver_address: byteArray2hexStr(unfreezeBalanceContract.getReceiverAddress_asU8()),
    };
    return commonData;
};

const DVoteWitnessContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const voteWitnessContract = VoteWitnessContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(voteWitnessContract.getOwnerAddress_asU8()),
        votes: voteWitnessContract.getVotesList().map((votePb) => ({
            vote_address: byteArray2hexStr(votePb.getVoteAddress_asU8()),
            vote_count: votePb.getVoteCount(),
        })),
    };
    return commonData;
};

// ============== Proposal contracts ==============

const DProposalCreateContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const proposalCreateContract = ProposalCreateContract.deserializeBinary(valuePb);
    const parametersMap = proposalCreateContract.getParametersMap();
    const parameters: { key: number; value: number }[] = [];
    [...parametersMap.entries()].forEach(([key, value]) => {
        parameters.push({ key, value });
    });
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(proposalCreateContract.getOwnerAddress_asU8()),
        parameters,
    };
    return commonData;
};

const DProposalApproveContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const proposalApproveContract = ProposalApproveContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(proposalApproveContract.getOwnerAddress_asU8()),
        proposal_id: proposalApproveContract.getProposalId(),
        is_add_approval: proposalApproveContract.getIsAddApproval(),
    };
    return commonData;
};

const DProposalDeleteContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const proposalDeleteContract = ProposalDeleteContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(proposalDeleteContract.getOwnerAddress_asU8()),
        proposal_id: proposalDeleteContract.getProposalId(),
    };
    return commonData;
};

// ============== Smart contract management ==============

const ENTRY_TYPE_MAP = ['', 'constructor', 'function', 'event', 'fallback', 'receive', 'error'];
const STATE_MUTABILITY_MAP = ['', 'pure', 'view', 'nonpayable', 'payable'];

const DCreateSmartContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const createSmartContract = CreateSmartContract.deserializeBinary(valuePb);
    const newContractPb = createSmartContract.getNewContract();
    const abiPb = newContractPb.getAbi();
    const abi = abiPb ? abiPb.getEntrysList().map(entry => {
        const mapParam = (p) => ({
            name: p.getName(),
            type: p.getType(),
            ...(p.getIndexed() ? { indexed: true } : {}),
        });
        return {
            type: ENTRY_TYPE_MAP[entry.getType()] || '',
            name: entry.getName(),
            inputs: entry.getInputsList().map(mapParam),
            outputs: entry.getOutputsList().map(mapParam),
            payable: entry.getPayable(),
            stateMutability: STATE_MUTABILITY_MAP[entry.getStatemutability()] || '',
            ...(entry.getConstant() ? { constant: true } : {}),
            ...(entry.getAnonymous() ? { anonymous: true } : {}),
        };
    }) : [];
    const new_contract = newContractPb ? {
        origin_address: byteArray2hexStr(newContractPb.getOriginAddress_asU8()),
        abi: { entrys: abi },
        bytecode: byteArray2hexStr(newContractPb.getBytecode_asU8()),
        call_value: newContractPb.getCallValue(),
        consume_user_resource_percent: newContractPb.getConsumeUserResourcePercent(),
        name: newContractPb.getName(),
        origin_energy_limit: newContractPb.getOriginEnergyLimit(),
    } : null;
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(createSmartContract.getOwnerAddress_asU8()),
        call_token_value: createSmartContract.getCallTokenValue(),
        token_id: createSmartContract.getTokenId(),
        new_contract,
    };
    return commonData;
};

const DUpdateSettingContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const updateSettingContract = UpdateSettingContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(updateSettingContract.getOwnerAddress_asU8()),
        contract_address: byteArray2hexStr(updateSettingContract.getContractAddress_asU8()),
        consume_user_resource_percent: updateSettingContract.getConsumeUserResourcePercent(),
    };
    return commonData;
};

const DUpdateEnergyLimitContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const updateEnergyLimitContract = UpdateEnergyLimitContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(updateEnergyLimitContract.getOwnerAddress_asU8()),
        contract_address: byteArray2hexStr(updateEnergyLimitContract.getContractAddress_asU8()),
        origin_energy_limit: updateEnergyLimitContract.getOriginEnergyLimit(),
    };
    return commonData;
};

const DClearABIContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const clearABIContract = ClearABIContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(clearABIContract.getOwnerAddress_asU8()),
        contract_address: byteArray2hexStr(clearABIContract.getContractAddress_asU8()),
    };
    return commonData;
};

// ============== Exchange + Brokerage contracts ==============

const DExchangeCreateContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const exchangeCreateContract = ExchangeCreateContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(exchangeCreateContract.getOwnerAddress_asU8()),
        first_token_id: byteArray2hexStr(exchangeCreateContract.getFirstTokenId_asU8()),
        first_token_balance: exchangeCreateContract.getFirstTokenBalance(),
        second_token_id: byteArray2hexStr(exchangeCreateContract.getSecondTokenId_asU8()),
        second_token_balance: exchangeCreateContract.getSecondTokenBalance(),
    };
    return commonData;
};

const DExchangeInjectContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const exchangeInjectContract = ExchangeInjectContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(exchangeInjectContract.getOwnerAddress_asU8()),
        exchange_id: exchangeInjectContract.getExchangeId(),
        token_id: byteArray2hexStr(exchangeInjectContract.getTokenId_asU8()),
        quant: exchangeInjectContract.getQuant(),
    };
    return commonData;
};

const DExchangeWithdrawContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const exchangeWithdrawContract = ExchangeWithdrawContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(exchangeWithdrawContract.getOwnerAddress_asU8()),
        exchange_id: exchangeWithdrawContract.getExchangeId(),
        token_id: byteArray2hexStr(exchangeWithdrawContract.getTokenId_asU8()),
        quant: exchangeWithdrawContract.getQuant(),
    };
    return commonData;
};

const DExchangeTransactionContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const exchangeTransactionContract = ExchangeTransactionContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(exchangeTransactionContract.getOwnerAddress_asU8()),
        exchange_id: exchangeTransactionContract.getExchangeId(),
        token_id: byteArray2hexStr(exchangeTransactionContract.getTokenId_asU8()),
        quant: exchangeTransactionContract.getQuant(),
        expected: exchangeTransactionContract.getExpected(),
    };
    return commonData;
};

const DUpdateBrokerageContract = (type, rawDataHex) => {
    const [commonData, valuePb] = DCommonData(type, rawDataHex);
    const updateBrokerageContract = UpdateBrokerageContract.deserializeBinary(valuePb);
    commonData.contract[0].parameter.value = {
        owner_address: byteArray2hexStr(updateBrokerageContract.getOwnerAddress_asU8()),
        brokerage: updateBrokerageContract.getBrokerage(),
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
        case 'TransferAssetContract':
            return DTransferAssetContract(type, rawDataHex);
        case 'ParticipateAssetIssueContract':
            return DParticipateAssetIssueContract(type, rawDataHex);
        case 'AssetIssueContract':
            return DAssetIssueContract(type, rawDataHex);
        case 'UpdateAssetContract':
            return DUpdateAssetContract(type, rawDataHex);
        case 'AccountCreateContract':
            return DAccountCreateContract(type, rawDataHex);
        case 'AccountUpdateContract':
            return DAccountUpdateContract(type, rawDataHex);
        case 'SetAccountIdContract':
            return DSetAccountIdContract(type, rawDataHex);
        case 'AccountPermissionUpdateContract':
            return DAccountPermissionUpdateContract(type, rawDataHex);
        case 'FreezeBalanceContract':
            return DFreezeBalanceContract(type, rawDataHex);
        case 'UnfreezeBalanceContract':
            return DUnfreezeBalanceContract(type, rawDataHex);
        case 'VoteWitnessContract':
            return DVoteWitnessContract(type, rawDataHex);
        case 'ProposalCreateContract':
            return DProposalCreateContract(type, rawDataHex);
        case 'ProposalApproveContract':
            return DProposalApproveContract(type, rawDataHex);
        case 'ProposalDeleteContract':
            return DProposalDeleteContract(type, rawDataHex);
        case 'CreateSmartContract':
            return DCreateSmartContract(type, rawDataHex);
        case 'UpdateSettingContract':
            return DUpdateSettingContract(type, rawDataHex);
        case 'UpdateEnergyLimitContract':
            return DUpdateEnergyLimitContract(type, rawDataHex);
        case 'ClearABIContract':
            return DClearABIContract(type, rawDataHex);
        case 'ExchangeCreateContract':
            return DExchangeCreateContract(type, rawDataHex);
        case 'ExchangeInjectContract':
            return DExchangeInjectContract(type, rawDataHex);
        case 'ExchangeWithdrawContract':
            return DExchangeWithdrawContract(type, rawDataHex);
        case 'ExchangeTransactionContract':
            return DExchangeTransactionContract(type, rawDataHex);
        case 'UpdateBrokerageContract':
            return DUpdateBrokerageContract(type, rawDataHex);
        default:
            throw new Error(`trasaction ${type} not supported`);
    }
};

export { deserializeTransaction };
