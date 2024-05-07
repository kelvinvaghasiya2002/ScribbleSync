import express, { response } from "express";
const router = express.Router();
import { ToDo } from "../../models/todo.js";



router.get("/getitems", (req, res) => {
    const email = req.headers.email;
    const date = req.headers.data;
    // console.log(email + " " + date);
    ToDo.find({ date: date, email: email }).then((response) => {
        if (response.length === 0) {
            res.status(200).json({
                message: "No tasks are scheduled on this date."
            })
        } else {
            res.status(200).json({
                result: response
            })
        }
    }).catch((err) => {
        res.status(500).json({
            error: "Internal server error!"
        })
    })
})


router.post("/additems", (req, res) => {
    const { email, data, item } = req.headers
    // console.log(email + " " + data + " " + item);

    const todoItem = new ToDo({
        email, date: data, item, done: false
    });

    todoItem.save().then((response) => {
        ToDo.find({ date: data, email: email }).then((result) => {
            res.status(200).json({
                success: "Item saved successfully!",
                result: result
            })
        }).catch((err) => {
            res.status(500).json({
                error: "error occured in collecting data"
            })
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            error: "Error occurred in saving the item!"
        })
    });
})



router.post("/checkitems", (req, res) => {
    const { id, email, data } = req.headers;
    // console.log(id + " " + email);

    ToDo.findOneAndUpdate(
        { _id: id, email: email }, // Filter for the specific todo item

        [
            { $set: { done: { $not: "$done" } } }
        ], // Toggle the value of "done"

        { new : true })
        .then((updatedTodo) => {
            // updatedTodo contains the updated document
            // console.log("hey"+updatedTodo);

            // Now, fetch all documents
            ToDo.find({ date: data, email: email }).then((response) => {
                res.status(200).json({
                    result: response
                })
            }).catch((err) => {
                res.status(500).json({
                    error: "error in /checkitems"
                })
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "error occured in toggling the 'done' field"
            })
        })
})


router.delete("/deleteitem",(req,res)=>{
    const { id, email , todo_date } = req.headers;
    console.log(todo_date);
    console.log(req.headers);
    ToDo.deleteOne({_id : id , email : email}).then((response)=>{
        console.log(response);
        ToDo.find({email: email , date:todo_date}).then((result)=>{
            res.status(200).json({
                result : result
            })
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({
                error : "error in deleting the item"
            })
        })
    }).catch((error)=>{
        console.log(error);
        res.status(500).json({
            error : "error-2 in deleting the item"
        })
    })
})




export default router;