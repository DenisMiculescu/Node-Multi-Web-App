const express = require('express');
const router = express.Router();

// Mock database
let adoptions = [];

// GET all adoptions
router.get('/', (req, res) => {
    res.json(adoptions);
});

// GET adoptions by email
router.get('/:email', (req, res) => {
    const email = req.params.email;
    const userAdoptions = adoptions.filter(d => d.email === email);
    res.json(userAdoptions);
});

// GET specific adoption by email and id
router.get('/:email/:id', (req, res) => {
    const { email, id } = req.params;
    const adoption = adoptions.find(d => d.email === email && d.id === id);

    if (adoption) {
        res.json(adoption);
    } else {
        res.status(404).send('Adoption not found');
    }
});

// POST add new adoption
router.post('/:email', (req, res) => {
    const email = req.params.email;
    const newAdoption = { ...req.body, email, id: Date.now().toString() };
    adoptions.push(newAdoption);
    res.status(201).json(newAdoption);
});

// DELETE adoption
router.delete('/:email/:id', (req, res) => {
    const { email, id } = req.params;
    const index = adoptions.findIndex(d => d.email === email && d.id == Number(id));
    if (index !== -1) {
        adoptions.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Adoption not found');
    }
});

// PUT update adoption
router.put('/:email/:id', (req, res) => {
    const { email, id } = req.params;

    console.log("DELETE endpoint hit");
    console.log("Request params:", req.params);
    console.log("Current adoptions:", JSON.stringify(adoptions, null, 2));

    const index = adoptions.findIndex(d => d.email === email && d.id === id);
    if (index !== -1) {
        adoptions[index] = { ...adoptions[index], ...req.body };
        res.json(adoptions[index]);
    } else {
        res.status(404).send('Adoption not found');
    }
});

module.exports = router;
