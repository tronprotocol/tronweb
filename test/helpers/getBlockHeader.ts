import { HttpProvider } from "../../src/lib/providers";
import { BlockWithoutDetail } from "../../src/types/APIResponse";

export function getHeaderInfo(node: HttpProvider) {
    return node.request<BlockWithoutDetail>('wallet/getblock', { detail: false }, 'post').then((data) => {
        return {
            ref_block_bytes: data.block_header.raw_data.number.toString(16).slice(-4).padStart(4, '0'),
            ref_block_hash: data.blockID.slice(16, 32),
            expiration: data.block_header.raw_data.timestamp + 60 * 1000,
            timestamp: data.block_header.raw_data.timestamp,
        };
    });
}