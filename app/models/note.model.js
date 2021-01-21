import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    title: String,
    content: String,
    done: {type: Boolean, default: false}
}, {
    timestamps: true
});

export default mongoose.model('Note', noteSchema);