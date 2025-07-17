const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// ✅ MongoDB connection
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB error:', err));

// ✅ Mongoose user schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// ✅ POST /login route
app.post('/login', async (req, res) => {
    const {email, password } = req.body;

    try {
        // Save to MongoDB
        const newUser = new User({ email, password });
        await newUser.save();

        res.json({ message: 'Login data stored in MongoDB' });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
