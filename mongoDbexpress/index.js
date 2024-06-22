const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override')
const port = 5000;
//file path
const Chat = require('./model/chat');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
// override with POST having ?_method=Put
app.use(methodOverride('_method'))
//ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//mongoose
main().then((res) => {
    console.log('connection successful')
}).catch((err) => {
    console.log(err)
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//express
app.get('/chats', async (req, res) => {
    let chats = await Chat.find();
    res.render('index.ejs', { chats })
});
//new rout
app.get('/chats/new', (req, res) => {
    res.render('new.ejs')
})
// chat create rout
app.post('/chats', (req, res) => {

    let { from, to, msg } = req.body;
    let newChats = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date
    })
    newChats.save()
        .then((res) => {
            console.log('data was saved')
        }).catch((err) => {
            console.log(err)
        })
    res.redirect('/chats')

});
//edit rout
app.get('/chats/:id/edit', async (req, res) => {
    let { id } = req.params
    let chat = await Chat.findById(id)
    res.render('edit.ejs', { chat })
});
//update rout
app.post('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChats = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
    console.log(updatedChats);
    res.redirect('/chats')
})
// delete rout
app.delete('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect('/chats');

});

app.get('/', (req, res) => {
    res.send('server is working.');
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});