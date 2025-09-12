use starknet::ContractAddress;

#[derive(Drop, starknet::Event)]
pub struct UserJoined {
    #[key]
    user: ContractAddress,
    user_ID: u16,
}
