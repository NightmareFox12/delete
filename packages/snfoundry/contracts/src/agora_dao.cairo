mod events;

#[starknet::interface]
pub trait IAgoraDao<TContractState> {
    // --- write functions ---
    fn join_dao(ref self: TContractState);

    // --- read states ---
    fn user_counter(self: @TContractState) -> u16;
    // --- read functions ---
}

#[starknet::contract]
pub mod AgoraDao {
    use starknet::event::EventEmitter;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_caller_address};

    //imports
    use super::events::UserJoined;


    #[storage]
    struct Storage {
        fabric: ContractAddress,
        creator: ContractAddress,
        user_counter: u16,
        is_user: Map<ContractAddress, bool>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        UserJoined: UserJoined,
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

            self.emit(UserJoined { user: caller, user_ID: self.user_counter.read() });

            self.user_counter.write(self.user_counter.read() + 1);
        }

        fn user_counter(self: @ContractState) -> u16 {
            self.user_counter.read()
        }
    }
}
