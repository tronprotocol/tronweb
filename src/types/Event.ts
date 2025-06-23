export interface GetEventResultOptions {
    /**
     * Name of the event to filter by.
     */
    eventName?: string;
    /**
     * Specific block number to query.
     */
    blockNumber?: number;
    /**
     * Maximum number returned.
     */
    limit?: number;
    /**
     * When the data volume of the query result is large, the returned result of one query will not contain all the data, and it takes multiple queries to obtain the complete data. Therefore, the fingerprint field will appear in the last piece of data in the returned result. After specifying this field as the content of the fingerprint in the result of the previous query in the next query, the query will return subsequent data. If there is no such field in the last data of the query result, it means that there is no more data.
     */
    fingerprint?: string;
    /**
     * If set to true, only returns confirmed transactions.
     */
    onlyConfirmed?: boolean;
    /**
     * If set to true, only returns unconfirmed transactions.
     */
    onlyUnconfirmed?: boolean;
    /**
     * Specify the query order, whether to query forward or backward from the sinceTimestamp.
     * The value can be 'block_timestamp,desc' for time sequence or 'block_timestamp,asc' for the reverse.
     * Default is 'block_timestamp,desc'.
     */
    orderBy?: 'block_timestamp,desc' | 'block_timestamp,asc';
    /**
     * Specifies the starting timestamp of the query, in milliseconds, default value is the current time.
     */
    minBlockTimestamp?: number;
    /**
     * Specifies the ending timestamp of the query, in milliseconds.
     */
    maxBlockTimestamp?: number;
}

export interface EventResponse {
    success: boolean;
    error?: string;
    data?: {
        block_number: number;
        block_timestamp: number;
        caller_contract_address: string;
        contract_address: string;
        event_index: number;
        event_name: string;
        result: Record<string, string>;
        result_type: Record<string, string>;
        event: string;
        transaction_id: string;
        _unconfirmed: boolean;
    }[];
    meta?: {
        at: number;
        fingerprint?: string;
        links?: {
            next: string;
        };
        page_size: number;
    };
}