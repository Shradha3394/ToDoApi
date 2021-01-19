import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

export default mongoose.model('Note', noteSchema);