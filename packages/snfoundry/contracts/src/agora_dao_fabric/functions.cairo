use starknet::ContractAddress;
use starknet::storage::{
    StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
    StoragePointerWriteAccess,
};
use super::AgoraDaoFabric::ContractState;


pub fn add_user_counter(ref self: ContractState, caller: ContractAddress) {
    if (!self.users.read(caller)) {
        self.users.write(caller, true);
        self.user_counter.write(self.user_counter.read() + 1);
    }
}
