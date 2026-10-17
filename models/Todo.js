import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    tier:{
        type: Number,
        required: true,
        min: [1, "Min tier is 1"], // Giới hạn min và câu thông báo lỗi
        max: [10, "Max tier is 10"]
    },
    status:{
        type: Boolean,
        default: false,
        required: true
    }
}, {timestamps: true} // createdAt, updatedAt 
);

const Todo =  mongoose.model("Todo",todoSchema)
export default Todo