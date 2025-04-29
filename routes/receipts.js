const express = require('express');
const router = express.Router();

// Mock database
let receipts = [];

// GET all receipts
router.get('/receipts', (req, res) => {
    res.json(receipts);
});

// GET receipts by email
router.get('/:email', (req, res) => {
    const email = req.params.email;
    const userReceipts = receipts.filter(d => d.email === email);
    res.json(userReceipts);
});

// POST add new receipt
router.post('/:email', (req, res) => {
    const email = req.params.email;
    const newReceipt = { ...req.body, email, id: Date.now().toString() };
    receipts.push(newReceipt);
    res.status(201).json(newReceipt);
});

// // PUT edit donation
// router.put('/:email/:id', (req, res) => {
//     const { email, id } = req.params;
//     const index = donations.findIndex(d => d.email === email && d.id === id);
//     if (index !== -1) {
//         donations[index] = { ...donations[index], ...req.body };
//         res.json(donations[index]);
//     } else {
//         res.status(404).send('Donation not found');
//     }
// });


// // DELETE donation
// router.delete('/:email/:id', (req, res) => {
//     const { email, id } = req.params;
//     const index = donations.findIndex(d => d.email === email && d.id === id);
//     if (index !== -1) {
//         donations.splice(index, 1);
//         res.status(204).send();
//     } else {
//         res.status(404).send('Donation not found');
//     }
// });

module.exports = router;
