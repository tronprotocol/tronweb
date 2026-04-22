import tronWebBuilder from "./tronWebBuilder.js";

let JSON_RPC_ID = 1;

export async function createEmptyBlock(tronWeb: InstanceType<typeof tronWebBuilder.TronWeb>) {
    return tronWeb.fullNode.request('/tre', {
        "jsonrpc": "2.0",
        "method": "tre_mine",
        "id": JSON_RPC_ID++,
    }, 'POST');
}
    