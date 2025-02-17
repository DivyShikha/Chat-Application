const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
     .then(() => console.log("connection successful"))
     .catch((err) => console.log("err"));
 
 async function main() {
     await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
 }

let allChats = [
    {
        to: "Neha",
        from: "Priya",
        msg: "send me your chem notes",
        created_at: new Date(),
    }, 
    {
        to: "Meet",
        from: "Divy",
        msg: "let's watch a movie",
        created_at: new Date(),
    },
    {
        to: "Ishikha",
        from: "Karma",
        msg: "do you want to walk around?",
        created_at: new Date(),
    },
    {
        to: "Jetlin",
        from: "Karma",
        msg: "the exam was pretty tough",
        created_at: new Date(),
    },
    {
        to: "Sanya",
        from: "Aakriti",
        msg: "the teacher was super strict",
        created_at: new Date(),
    },
];

 Chat.insertMany(allChats);