//Deployed Frontend:- https://bajaj-task-00e4.onrender.com/ 
// Deployed API:- https://bajaj-backend-1-g07m.onrender.com/bfhl/
const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());


const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";


const isAlphabet = (str) => /^[A-Za-z]+$/.test(str);  
const isNumber = (str) => /^\d+$/.test(str);

const findHighestAlphabet = (alphabets) => {
    if (alphabets.length === 0) return [];
    const highest = alphabets.reduce((max, curr) => 
        curr.toUpperCase() > max.toUpperCase() ? curr : max
    );
    return [highest];
};


app.get('/bfhl', (req, res) => {
    return res.status(200).json({ operation_code: 1 });
});


app.post('/bfhl', (req, res) => {
    try {
        if (!req.body.data || !Array.isArray(req.body.data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input format. Expected array in 'data' field"
            });
        }

        const numbers = req.body.data.filter(item => isNumber(item));
        const alphabets = req.body.data.filter(item => isAlphabet(item));
        const highest_alphabet = findHighestAlphabet(alphabets);

        return res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        });

    } catch (error) {
        return res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
