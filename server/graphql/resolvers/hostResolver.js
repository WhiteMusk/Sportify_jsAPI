const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;
const Host = require('../../models/host.model');

module.exports = {
    Query: {
        async host(_, args) {
            return await Host.findOne({ _id: ObjectId(args.host_id) });
        },
    },
    Mutation: {
        async loginCheck(_, args) {
            // Make sure the user exists
            const host = await Host.findOne({ email: args.data.email });
            if (!host) {
                console.log("Login failed: User not found.");
                return null;
            }

            if (host.googleId) {
                
            } else { // Normal login
                // Check if password is correct
                const isPasswordCorrect = await bcrypt.compare(args.data.password, host.password);
                if (!isPasswordCorrect) {
                    console.log("Login failed: Password is incorrect.");
                    return null;
                }
                // Generate jwt token
                const token = jwt.sign({ email: host.email }, "SECRET_KEY", { expiresIn: "1h" });
            }
            return { _id: host._id, name: host.name, email: host.email };
        },
        async addHost(_, args) {
            // Make sure the email hasn't been used to sign up
            const existingHost = await Host.findOne({ email: args.data.email });
            if (existingHost) {
                console.log("Sign up failed: email has been used.");
                return null;
            }

            // Make sure passwords match
            if (args.data.password !== args.data.confirmPassword) {
                console.log("Sign up failed: Passwords don't match.");
                return null;
            }

            const passwordHashed = await bcrypt.hash(args.data.password, 12);
            const newHost = new Host({
                name: args.data.name,
                email: args.data.email,
                password: passwordHashed
            });

            newHost.save()
            .then(host => {
                console.log(host);
                return { _id: host._id, name: host.name, email: host.email };
            })
            .catch(err => {
                console.log(err);
                return null;
            });
        },
        async editHost(_, args) {
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