const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
 const ExpressError = require("./ExpressError");
const { estimatedDocumentCount } = require("../MAJORPROJECT/models/listing.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


main()
    .then(() => console.log("connection successful"))
    .catch((err) => console.log("err"));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}



app.get("/", (req, res) =>{
    res.send("root is working");
});

//Index Route
app.get("/chats", async (req, res, next) =>{
    try{let chats = await Chat.find();// await as find() is an async function
        //console.log(chats);
        res.render("index.ejs", { chats });
    }catch(err){
        next(err);
    }
    
});

//New Route
app.get("/chats/new", async (req, res, next) =>{
    // throw new ExpressError(404, "Page Not Found");
    res.render("new.ejs");
})

//Create Route
app.post("/chats", asyncWrap (async (req, res, next) =>{
    //console.log("Request Body:", req.body); 
        let { to, from, msg } = req.body;
        // Create a new Chat instance with the provided data
        const newChat = new Chat({
            from: from,
            to: to,
            msg: msg,
            created_at: new Date(),
        });
        await newChat.save()
            // .then( res => { console.log("chat was saved") })
            // .catch( err => { console.log(err) });
        res.redirect("/chats");
}));

function asyncWrap (fn){
    return function(req, res, next){
        fn(req, res, next).catch((err)=> next(err));
    }
}
// //NEW - Show Route
// app.get("/chats/:id", asyncWrap (async (req, res, next) =>{
//         let { id } = req.params; 
//         let chat = await Chat.findById(id);
//         if( !chat ){
//             return next(new ExpressError(404, "Chat Not Found"));
//         }
//         res.render("edit.ejs", { chat });
// }));

//Edit Route
app.get("/chats/:id/edit", asyncWrap (async(req, res, next) =>{
        let {id}  = req.params;
        const chat = await Chat.findById(id);
        res.render("edit.ejs", { chat });
}));

//Update Route
app.put("/chats/:id", asyncWrap (async (req, res)=>{
        let { id } = req.params;
        let { msg: newMsg } = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(id,
            { msg: newMsg},
            { runValidators: true},
            {new: true},
        )
        console.log(updatedChat);
        res.redirect("/chats");
}));

//Destroy Route
app.delete("/chats/:id", asyncWrap (async (req, res) =>{
    
        const { id } = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id)
        console.log(deletedChat);
        res.redirect("/chats");
}));

const handleValidationErr =  (err) =>{
    console.log("This was a validation error. Please follow rules!");
    console.dir(err.message);
    return err;
};

app.use((err, req, res, next) =>{
    console.log(err.name);
    if(err.name === "ValidationError"){
        err = handleValidationErr(err);
    }
    next(err);
});

//Global Error Handling Middleware
app.use((err, req, res, next) =>{
    console.error("Error Object:", err); 
    let { status = 500, message = "Some Error Occurred" }  = err;
    res.status(status).send(`${status} - ${message}`);
});



app.listen(8080, () =>{
    console.log("app listening on port 8080");
});