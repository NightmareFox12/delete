mod events;
mod roles;

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
    //OpenZeppelin imports
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
    use super::roles::{ADMIN_ROLE, USER_ROLE};

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
        user_counter: u16,
        
        //Mappings
        users: Map<u16, ContractAddress>,
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

        // AccessControl-related initialization
        self.accesscontrol.initializer();
        self.accesscontrol._grant_role(ADMIN_ROLE, creator);
    }

    // #[external(v0)]

    #[abi(embed_v0)]
    impl AgoraDaoImpl of super::IAgoraDao<ContractState> {
        fn join_dao(ref self: ContractState) {
            let caller = get_caller_address();

            assert!(
                !self.accesscontrol.has_role(USER_ROLE, get_caller_address()),
                "User already joined",
            );
            assert!(
                !self.accesscontrol.has_role(ADMIN_ROLE, get_caller_address()),
                "Creator cannot join",
            );

            let user_id = self.user_counter.read();

            self.users.write(user_id, caller);
            self.emit(UserJoined { user: caller, user_ID: user_id });
            self.accesscontrol.grant_role(USER_ROLE, caller);
            self.user_counter.write(user_id + 1);
        }

        fn user_counter(self: @ContractState) -> u16 {
            self.user_counter.read()
        }

        fn is_user(self: @ContractState) -> bool {
            self.has_role(USER_ROLE, get_caller_address())
        }
    }
}
