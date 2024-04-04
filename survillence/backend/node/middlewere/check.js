const zod = require("zod");

const userschema = zod.object({
    Useremail: zod.string().email(),
    Username: zod.string(),
    Password: zod.string().min(8),
    Servilancepartner:zod.boolean()
});

const signinschema = zod.object({
    Username: zod.string(),
    Password: zod.string().min(8)
});

const surveillanceSchema = zod.object({
    firstName: zod.string().nonempty(),
    lastName: zod.string().nonempty(),
    adhar: zod.string().nonempty(),
    location: zod.object({
        latitude: zod.number().min(-90).max(90),
        longitude: zod.number().min(-180).max(180)
    })
});

module.exports = { userschema, signinschema, surveillanceSchema };
