import Todo from "../models/Todo.js";

export async function getTodos(req, res) {
    try{
        const todos = await Todo.find().sort({createdAt: -1}); // sort by day
        res.status(200).json(todos);
    } catch (error) {
        console.error("error getting todo", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function addTodo(req, res){
    try{
        const {title, tier} = req.body;
        if (!title) {
            return res.status(400).json({message:"Title shortage!"})
        }
        if (!tier) {
            return res.status(400).json({message:"Tier shortage!"})
        }
        const todo = new Todo({title, tier});
        const newTodo = await todo.save();
        res.status(201).json(newTodo)
    } catch (error) {
        // Check xem có phải lỗi do Mongoose Validate hay không
        // Cụ thể là min max của tier
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        
        console.error("error adding Todo", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateTodo(req, res){
    try{
        const {id} = req.params;
        const {title, tier} = req.body;
        
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            {title, tier},
            { 
                new: true,           // Trả về document mới
                runValidators: true  // Ép chạy validation trong Schema
            }
        );

        if (!updatedTodo) {
            return res.status(404).json({message: "Todo not found!"})
        }
        
        res.status(200).json(updatedTodo);
    } catch (err) {
        console.error("error updating todo", err);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function deleteTodo(req, res){
    try{        
        const delTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!delTodo) return res.status(404).json({ message: "Not found!" });
        
        res.status(200).json({message: "Todo deleted"});
    } catch (err) {
        console.error("error deleting todo", err);
        res.status(500).json({message: "Internal server error"});
    }
}