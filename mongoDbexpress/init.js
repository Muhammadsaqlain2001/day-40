const mongoose = require('mongoose');
const Chat = require('./model/chat');

main().then((res)=>{
    console.log('connection successful')
}).catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats=[
    {
        from : 'Adam',
        to : 'crist',
        msg : 'What does a storm cloud wear under his raincoat? Thunderwear.',
        created_at : new Date()
    },
    {
        from : 'sam curan',
        to : 'gill',
        msg : 'What’s the smartest insect? A spelling bee!',
        created_at : new Date()
    },{
        from : 'helly',
        to : 'phillips',
        msg : ' Why are snails slow? Because they’re carrying a house on their back',
        created_at : new Date()
    },{
        from : 'villaims',
        to : 'alax',
        msg : 'What do you call an ant who fights crime? A vigilANTe!',
        created_at : new Date()
    },{
        from : 'pat cummins',
        to : 'marcus',
        msg : 'What do kids play when their mom is using the phone? Bored games.',
        created_at : new Date()
    },
];

Chat.insertMany(allChats);