mod events;

#[starknet::interface]
pub trait IAgoraDao<TContractState> {
    // --- write functions ---
    fn join_dao(ref self: TContractState);

    // --- read states ---
    fn user_counter(self: @TContractState) -> u16;

    // --- read functions ---
    fn is_user(self: @TContractState) -> bool;
}

#[starknet::contract]
pub mod AgoraDao {
    use openzeppelin_access::accesscontrol::AccessControlComponent;
    use openzeppelin_introspection::src5::SRC5Component;
    use starknet::event::EventEmitter;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_caller_address};

    //imports
    use super::events::UserJoined;

    //constans
    const TASK_MANAGER_ROLE: felt252 = selector!("TASK_MANAGER_ROLE"); //   

    //components
    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    // AccessControl
    #[abi(embed_v0)]
    impl AccessControlImpl =
        AccessControlComponent::AccessControlImpl<ContractState>;
    impl AccessControlInternalImpl = AccessControlComponent::InternalImpl<ContractState>;

    // SRC5
    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;

    #[storage]
    struct Storage {
        fabric: ContractAddress,
        creator: ContractAddress,
        user_counter: u16,
        is_user: Map<ContractAddress, bool>,
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        UserJoined: UserJoined,
        #[flat]
        AccessControlEvent: AccessControlComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
    }

    #[constructor]
    fn constructor(ref self: ContractState, fabric: ContractAddress, creator: ContractAddress) {
        self.fabric.write(fabric);
        self.creator.write(creator);
    }

    #[abi(embed_v0)]
    impl AgoraDaoImpl of super::IAgoraDao<ContractState> {
        fn join_dao(ref self: ContractState) {
            let caller = get_caller_address();
            assert!(!self.is_user.read(caller), "User already joined");
            assert!(self.creator.read() != caller, "Creator cannot join");

            self.is_user.write(caller, true);

            self.emit(UserJoined { user: caller, user_ID: self.user_counter.read() });

            self.user_counter.write(self.user_counter.read() + 1);
        }

        fn user_counter(self: @ContractState) -> u16 {
            self.user_counter.read()
        }

        fn is_user(self: @ContractState) -> bool {
            self.is_user.read(get_caller_address())
        }
    }
}
