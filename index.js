const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


main()
    .then(() => console.log("connection successful"))
    .catch((err) => console.log("err"));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}



app.get("/", (req, res) =>{
    res.send("root is working");
});

app.get("/chats", async (req, res) =>{
    let chats = await Chat.find();// await as find() is an async function
    //console.log(chats);
    res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) =>{
    res.render("new.ejs");
})

app.post("/chats", (req, res) =>{
    //console.log("Request Body:", req.body); 
    let { to, from, msg } = req.body;
    // Create a new Chat instance with the provided data
    const newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat.save()
        .then(res =>{console.log("chat was saved")})
        .catch(err =>{console.log(err)});
    res.redirect("/chats");
    
});

//Edit route
app.get("/chats/:id/edit", async(req, res) =>{
    let {id}  = req.params;
    const chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

//Update route
app.put("/chats/:id", async (req, res)=>{
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,
        { msg: newMsg},
        { runValidators: true},
        {new: true},
    )
    console.log(updatedChat);
    res.redirect("/chats");
});

//Destroy Route
app.delete("/chats/:id", async (req, res) =>{
    const { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id)
    console.log(deletedChat);
    res.redirect("/chats");
})

app.listen(8080, () =>{
    console.log("app listening on port 8080");
});