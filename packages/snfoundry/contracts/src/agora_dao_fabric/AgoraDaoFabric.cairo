use super::events::Event;
use super::structs::Dao;

#[starknet::interface]
trait IAgoraDaoFabric<TContractState> {
    fn createDao(ref self: TContractState);
    fn user_counter(self: @TContractState) -> u16;

    // --- Read Functions ---
    fn get_total_dao_count(self: @TContractState) -> u16;
}

#[starknet::contract]
mod AgoraDaoFabric {
    //OpenZeppelin Libraries
    use openzeppelin_access::ownable::OwnableComponent;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_caller_address, get_contract_address};

    //OpenZeppelin Components
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        user_counter: u16,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[abi(embed_v0)]
    impl AgoraDaoFabric of super::IAgoraDaoFabric<ContractState> {
        fn createDao(ref self: ContractState) {
            self.user_counter.write(self.user_counter.read() + 1);

            let counter_class_hash = self.counter_class_hash.read();
            let constructor_calldata = array![];

            let (contract_address, _) = starknet::deploy_contract_syscall(
                counter_class_hash, constructor_calldata.span(), salt, false,
            )
                .unwrap();

            contract_address
        }

        fn user_counter(self: @ContractState) -> u16 {
            return self.user_counter.read();
        }

        fn get_total_dao_count(self: @ContractState) -> u16 {
            return self.user_counter.read();
        }
    }
}
