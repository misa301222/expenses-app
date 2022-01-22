import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    description: { type: String, required: true },
    quantitySpent: { type: Number, required: true },
    feeling: { type: String, required: true },
    date: { type: Date, required: true },
    email: { type: String, required: true }
}, { timestamps: true });

let Expense = mongoose.models.expenses || mongoose.model('expenses', expenseSchema);
export default Expense;