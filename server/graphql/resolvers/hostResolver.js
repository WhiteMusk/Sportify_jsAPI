const ObjectId = require('mongodb').ObjectID;
const Host = require('../../models/host.model');

module.exports = {
    Query: {
        async host(parent, args, { HostDB }, info) {
            return await Host.findOne({ _id: ObjectId(args.host_id) });
        },
    },
    Mutation: {
        async editHost(parent, args, { HostDB }, info) {
            await Host.findOne({ _id: ObjectId(args.data._id) }, function (err, host) {
                if (!err) {
                    if (host) {
                        host.name = args.data.name;
                        host.phone = args.data.phone;
                        host.email = args.data.email;
                        host.page = args.data.page;
                        host.bank_code = args.data.bank_code;
                        host.bank_account = args.data.bank_account;
                        host.save()
                    }
                }
            });

            return true;
        }
    }
}