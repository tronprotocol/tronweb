import { AbstractTrx } from './AbstractTrx.js';

/**
 * Raw variant of the chain-reading APIs, reachable as `tronWeb.trx.raw`.
 *
 * Reads are issued as GET with `int64_as_string=true` (java-tron#6699), so the node
 * serializes int64/uint64 fields as JSON strings and values above 2^53 - 1 reach JS
 * without precision loss. Return types reflect this: int64 fields of the regular
 * responses are typed (and arrive) as strings — see {@link Int64AsString} for the
 * exact mapping and its boundaries. `getCurrentBlock`/`getConfirmedCurrentBlock` are
 * rerouted to the flag-honoring `wallet[solidity]/getblock?detail=true`; the reads
 * that cannot take the flag stay on the regular number path in both modes (see the
 * {@link AbstractTrx} docs for the pinned list).
 *
 * Requirements and caveats:
 * - the connected node must run java-tron#6699 or later; older nodes ignore the flag
 *   and keep returning (possibly precision-lossy) numbers;
 * - responses read here must NOT be fed back into transaction-consuming endpoints
 *   (`sendRawTransaction`, `getSignWeight`, ...): the node rejects string-encoded
 *   int64 fields in request bodies.
 */
export class RawTrx extends AbstractTrx<true> {
    protected readonly int64AsString = true as const;
}
