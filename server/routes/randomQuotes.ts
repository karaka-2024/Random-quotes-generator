import { Router } from 'express'

import * as db from '../db/randomQuotes.ts'

const router = Router()

// GET /api/v1/quotes - Fetch all quotes
router.get('/', async (req, res) => {
  try {
    const randomQuotes = await db.getAllRandomQuotes()
    res.json(randomQuotes)
  } catch (error) {
    console.error('Error fetching quotes:', error); 
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// GET /api/v1/quotes/:id - Fetch a single quote by ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const quote = await db.getRandomQuotesById(id)
    if (quote) {
      res.json(quote)
    } else {
      res.sendStatus(404) 
    }
  } catch (error) {
    console.error(`Error fetching quote with ID ${id}:`, error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// POST /api/v1/quotes - Add a new quote
router.post('/', async (req, res) => {
  const { quote, author } = req.body;
  if (!quote || !author) {
    return res.status(400).json({ message: 'Quote and author are required' });
  }
  try {
    const [newQuoteId] = await db.addQuote(quote, author);
    res.status(201).json({ id: newQuoteId });
  } catch (error) {
    console.error('Error adding quote:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// PATCH /api/v1/quotes/:id - Update an existing quote
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { quote, author } = req.body;
  if (!quote && !author) {
    return res.status(400).json({ message: 'At least one of quote or author is required' });
  }
  try {
    const updatedQuote = await db.updateQuote(id, quote, author);
    if (updatedQuote > 0) {
      res.sendStatus(200); // Success
    } else {
      res.sendStatus(404); // Quote not found
    }
  } catch (error) {
    console.error(`Error updating quote with ID ${id}:`, error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// DELETE /api/v1/quotes/:id - Delete a quote
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deletedQuote = await db.deleteQuote(id);
    if (deletedQuote > 0) {
      res.sendStatus(204); // No content
    } else {
      res.sendStatus(404); // Quote not found
    }
  } catch (error) {
    console.error(`Error deleting quote with ID ${id}:`, error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


export default router
