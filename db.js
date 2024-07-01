const mongoose= require('mongoose');

require('dotenv').config()
user=process.env.user
password=process.env.password
db=process.env.db


const URI="mongodb+srv://miguelbermejo1:Hispalis3@vizzio.cshphnm.mongodb.net/?retryWrites=true&w=majority&appName=vizzio"
mongoose.connect(URI).then(db =>console.log('Conectado')).catch(err=> console.log(err))