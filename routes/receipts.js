const express = require('express');
const router = express.Router();

// Mock database
let receipts = [];

// GET all receipts
router.get('/', (req, res) => {
    res.json(receipts);
});

// GET receipts by email
router.get('/:email', (req, res) => {
    const email = req.params.email;
    const userReceipts = receipts.filter(d => d.email === email);
    res.json(userReceipts);
});

// GET specific receipt by email and id
router.get('/:email/:id', (req, res) => {
    const { email, id } = req.params;
    const receipt = receipts.find(d => d.email === email && d.id === id);

    if (receipt) {
        res.json(receipt);
    } else {
        res.status(404).send('Receipt not found');
    }
});

// POST add new receipt
router.post('/:email', (req, res) => {
    const email = req.params.email;
    const newReceipt = { ...req.body, email, id: Date.now().toString() };
    receipts.push(newReceipt);
    res.status(201).json(newReceipt);
});

// DELETE receipt
router.delete('/:email/:id', (req, res) => {
    const { email, id } = req.params;
    const index = receipts.findIndex(d => d.email === email && d.id == Number(id));
    if (index !== -1) {
        receipts.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Receipt not found');
    }
});

// PUT update receipt
router.put('/:email/:id', (req, res) => {
    const { email, id } = req.params;

    console.log("DELETE endpoint hit");
    console.log("Request params:", req.params);
    console.log("Current receipts:", JSON.stringify(receipts, null, 2));

    const index = receipts.findIndex(d => d.email === email && d.id === id);
    if (index !== -1) {
        receipts[index] = { ...receipts[index], ...req.body };
        res.json(receipts[index]);
    } else {
        res.status(404).send('Receipt not found');
    }
});

module.exports = router;
