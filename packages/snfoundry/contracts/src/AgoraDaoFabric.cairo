#[starknet::interface]
trait IAgoraDaoFabric<TContractState> {
    fn createDao(ref self: TContractState);
    fn get(self: @TContractState) -> u128;
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

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }

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
        }

        fn get(self: @ContractState) -> u128 {
            let number: u128 = 4;
            return number;
        }
    }
}
