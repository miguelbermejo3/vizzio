const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nombre:{type:string},
    apellido:{type:string},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
