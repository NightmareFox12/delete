mod structs;

use openzeppelin_access::ownable::OwnableComponent;
use starknet::ContractAddress;
use starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};

#[starknet::interface]
trait IAgoraDaoFabric<TContractState> {
    fn create_dao(ref self: TContractState);
    fn user_counter(self: @TContractState) -> u16;
    fn get_total_dao_count(self: @TContractState) -> u16;
}

#[starknet::contract]
mod AgoraDaoFabric {
    use openzeppelin_access::ownable::OwnableComponent;
    use starknet::ContractAddress;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use super::structs::Dao;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[storage]
    pub struct Storage {
        all_daos: Array<Dao>,
        dao: Dao,
        pub user_counter: u16,
        //Mappings
        users: Map<ContractAddress, bool>,

        //Arrays

        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    
    #[constructor]
    fn constructor(ref self: ContractState, a: u128, b: u8, c: u256) {
    }


    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }

    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl AgoraDaoFabric of super::IAgoraDaoFabric<ContractState> {
        fn create_dao(ref self: ContractState) {
            self.user_counter.write(self.user_counter.read() + 1);
        }

        fn user_counter(self: @ContractState) -> u16 {
            self.user_counter.read()
        }

        fn get_total_dao_count(self: @ContractState) -> u16 {
            self.user_counter.read()
        }
    }
}
