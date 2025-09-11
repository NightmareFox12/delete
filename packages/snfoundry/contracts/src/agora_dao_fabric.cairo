mod functions;
mod structs;
mod validations;

//Types for interface
use super::agora_dao_fabric::structs::Dao;

#[starknet::interface]
trait IAgoraDaoFabric<TContractState> {
    // --- write functions ---
    fn create_dao(
        ref self: TContractState,
        name: ByteArray,
        description: ByteArray,
        category_ID: u16,
        image_URI: ByteArray,
        is_public: bool,
    );

    // --- read functions ---
    fn user_counter(self: @TContractState) -> u16;
    fn dao_counter(self: @TContractState) -> u16;
    fn get_all_categories(self: @TContractState) -> Array<ByteArray>;
    fn public_daos(self: @TContractState) -> Array<Dao>;
}

#[starknet::contract]
mod AgoraDaoFabric {
    use openzeppelin_access::ownable::OwnableComponent;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use starknet::syscalls::deploy_syscall;
    use starknet::{
        ClassHash, ContractAddress, get_block_timestamp, get_caller_address, get_contract_address,
    };

    //imports
    use super::functions::add_user_counter;
    use super::structs::Dao;
    use super::validations::create_dao_validation;

    //constants
    const CLASS_HASH: felt252 = 0x58398a6e5d0e495f7f15becadd6dfdc1ed5b6705af6f4dce97f8d0a7fc180b6;

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
        fn create_dao(
            ref self: ContractState,
            name: ByteArray,
            description: ByteArray,
            category_ID: u16,
            image_URI: ByteArray,
            is_public: bool,
        ) {
            let caller = get_caller_address();

            //validations
            create_dao_validation(
                ref self,
                name.clone(),
                description.clone(),
                category_ID,
                self.category_counter.read(),
            );

            //create dao
            let salt: felt252 = get_block_timestamp().into();
            let mut calldata: Array<felt252> = ArrayTrait::new();
            let fabric_felt: felt252 = get_contract_address().into();
            let creator_felt: felt252 = caller.into();

            calldata.append(fabric_felt);
            calldata.append(creator_felt);

            let class_hash: ClassHash = TryInto::try_into(CLASS_HASH).unwrap();

            let (dao_address, _) = deploy_syscall(class_hash, salt, calldata.span(), false)
                .unwrap();

            //store dao
            let newDao: Dao = Dao {
                dao_ID: self.dao_counter.read(),
                creator: caller,
                name: name,
                description: description,
                category: self.categories.read(category_ID),
                dao_address: dao_address,
                image_URI: image_URI,
                is_public: is_public,
                creation_timestamp: get_block_timestamp(),
            };

            add_user_counter(ref self, caller);

            self.daos.write(self.dao_counter.read(), newDao);
            self.dao_counter.write(self.dao_counter.read() + 1);
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
            res
        }

        fn public_daos(self: @ContractState) -> Array<Dao> {
            let mut res: Array<Dao> = ArrayTrait::new();
            let mut i: u16 = 0;

            while i != self.dao_counter.read() {
                if self.daos.read(i).is_public {
                    res.append(self.daos.read(i));
                }
                i += 1;
            }
            res
        }
    }
}
