#[starknet::interface]
pub trait IAgoraDao<TContractState> {
    fn join_dao(ref self: TContractState);
}

#[starknet::contract]
pub mod AgoraDao {
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_caller_address};


    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        GreetingChanged: GreetingChanged,
    }

    #[derive(Drop, starknet::Event)]
    struct GreetingChanged {
        #[key]
        greeting_setter: ContractAddress,
        #[key]
        new_greeting: ByteArray,
        premium: bool,
        value: Option<u256>,
    }

    #[storage]
    struct Storage {
        fabric: ContractAddress,
        creator: ContractAddress,
        user_counter: u16,
        is_user: Map<ContractAddress, bool>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, fabric: ContractAddress, creator: ContractAddress) {
        self.fabric.write(fabric);
        self.creator.write(creator);
        self.user_counter.write(self.user_counter.read() + 1);
    }

    #[abi(embed_v0)]
    impl AgoraDaoImpl of super::IAgoraDao<ContractState> {
        fn join_dao(ref self: ContractState) {
            let caller = get_caller_address();
            assert!(!self.is_user.read(caller), "User already joined");

            self.is_user.write(caller, true);
            self.user_counter.write(self.user_counter.read() + 1);
        }
    }
}
