pub mod structs {
    #[derive(Drop)]
    struct Dao {
        active: bool,
        username: ByteArray,
        email: ByteArray,
        sign_in_count: u64,
    }
}
