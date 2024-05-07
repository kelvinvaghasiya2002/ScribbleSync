import mongoose from "mongoose";


const TodoitemSchema = new mongoose.Schema({
    item : {
        type : String
    },
    done : {
        type : Boolean
    },
    email : {
        type : String
    },
    date : {
        type : String
    }
})

// const todoSchema = new mongoose.Schema({
//     date: {
//         type: String
//     },
//     userId: {
//         type: String
//     },
//     items : {
//         type : [itemSchema]
//     }
// })


export const ToDo = new mongoose.model("ToDo" , TodoitemSchema);


