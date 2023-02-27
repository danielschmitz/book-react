const contacts = [
    {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "phone": "(555) 555-5555"
    },
    {
        "name": "Jane Doe",
        "email": "janedoe@example.com",
        "phone": "(555) 555-5555"
    },
    {
        "name": "Bob Smith",
        "email": "bobsmith@example.com",
        "phone": "(555) 555-5555"
    },
    {
        "name": "Alice Johnson",
        "email": "alicejohnson@example.com",
        "phone": "(555) 555-5555"
    },
    {
        "name": "Tom Williams",
        "email": "tomwilliams@example.com",
        "phone": "(555) 555-5555"
    },
    {
        "name": "Samantha Brown",
        "email": "samanthabrown@example.com",
        "phone": "(555) 555-5555"
    },
    {
        "name": "Michael Davis",
        "email": "michaeldavis@example.com",
        "phone": "(555) 555-5555"
    },
    {
        "name": "Emily Wilson",
        "email": "emilywilson@example.com",
        "phone": "(555) 555-5555"
    },
    {
        "name": "David Lee",
        "email": "davidlee@example.com",
        "phone": "(555) 555-5555"
    },
    {
        "name": "Karen Kim",
        "email": "karenkim@example.com",
        "phone": "(555) 555-5555"
    }
]


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('contacts', table => {
            table.increments('id')
            table.string('name')
            table.string('email')
            table.string('phone')
        })
        .then(() => knex('contacts').insert(contacts))
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('contacts')
};
