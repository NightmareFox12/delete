mod functions;
mod structs;


#[starknet::interface]
trait IAgoraDaoFabric<TContractState> {
    // --- write functions ---
    fn create_dao(ref self: TContractState, name: ByteArray, description: ByteArray);

    // --- read functions ---
    fn user_counter(self: @TContractState) -> u16;
    fn dao_counter(self: @TContractState) -> u16;

    fn get_all_categories(self: @TContractState) -> Array<ByteArray>;
}

#[starknet::contract]
mod AgoraDaoFabric {
    use openzeppelin_access::ownable::OwnableComponent;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_caller_address};

    //imports
    use super::functions::add_user_counter;
    use super::structs::Dao;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[storage]
    pub struct Storage {
        pub user_counter: u16,
        pub dao_counter: u16,
        pub category_counter: u16,
        //Mappings
        pub users: Map<ContractAddress, bool>,
        pub daos: Map<u16, Dao>,
        pub categories: Map<u16, ByteArray>,
        #[substorage(v0)]
        pub ownable: OwnableComponent::Storage,
    }


    #[constructor]
    fn constructor(ref self: ContractState) {
        let mut category_counter = self.category_counter.read();

        self.categories.write(category_counter, "GAMING");
        category_counter = category_counter + 1;

        self.categories.write(category_counter, "SERVICE");
        category_counter = category_counter + 1;

        self.categories.write(category_counter, "GOVERNANCE");
        category_counter = category_counter + 1;

        self.categories.write(category_counter, "SOCIAL IMPACT");
        category_counter = category_counter + 1;

        self.categories.write(category_counter, "ENERGY");
        self.category_counter.write(category_counter + 1);
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }

    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl AgoraDaoFabric of super::IAgoraDaoFabric<ContractState> {
        fn create_dao(ref self: ContractState, name: ByteArray, description: ByteArray) {
            let caller = get_caller_address();

            assert!(name.len() > 0, "Dao name must not be empty");
            assert!(description.len() > 0, "Dao description must not be empty");

            add_user_counter(ref self, caller);
        }

        // --- read functions ---
        fn user_counter(self: @ContractState) -> u16 {
            self.user_counter.read()
        }

        fn dao_counter(self: @ContractState) -> u16 {
            self.dao_counter.read()
        }

        fn get_all_categories(self: @ContractState) -> Array<ByteArray> {
            let mut res: Array<ByteArray> = ArrayTrait::new();
            let mut i: u16 = 0;

            while i != self.category_counter.read() {
                res.append(self.categories.read(i));
                i += 1;
            }

            return res;
        }
    }
}
