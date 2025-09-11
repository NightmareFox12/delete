use starknet::ContractAddress;

#[derive(Drop, Serde,starknet::Store)]
pub struct Dao {
    daoID: u16,
    creator: ContractAddress,
    daoAddress: ContractAddress,
    name: ByteArray,
    description: ByteArray,
    category: ByteArray,
    imageURI: ByteArray,
    isPublic: bool,
    creationTimestamp: u32,
}
