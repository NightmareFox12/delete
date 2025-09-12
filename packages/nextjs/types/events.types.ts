export type UserJoinedEvent = {
  address: string;
  args: { user: string; userID: bigint };
  blockData: { timestamp: bigint };
  blockHash: string;
  eventName: 'UserJoined';
  transactionHash: string;
};
