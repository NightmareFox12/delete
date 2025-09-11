#[starknet::interface]
pub trait IAgoraDao<TContractState> {
    fn hello(self: @TContractState) -> ByteArray;
}

#[starknet::contract]
pub mod AgoraDao {
    use openzeppelin_access::ownable::OwnableComponent;
    use starknet::storage::{
        Map, StoragePointerReadAccess,
    };
    use starknet::{ContractAddress};

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    pub const FELT_STRK_CONTRACT: felt252 =
        0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d;

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
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
        greeting: ByteArray,
        premium: bool,
        total_counter: u256,
        user_greeting_counter: Map<ContractAddress, u256>,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[constructor]
    fn constructor(ref self: ContractState, fabric: ContractAddress, creator: ContractAddress) {// self.greeting.write("Building Unstoppable Apps!!!");
    // self.ownable.initializer(owner);
    }

    #[abi(embed_v0)]
    impl AgoraDaoImpl of super::IAgoraDao<ContractState> {
        fn hello(self: @ContractState) -> ByteArray {
            self.greeting.read()
        }
    }
}
