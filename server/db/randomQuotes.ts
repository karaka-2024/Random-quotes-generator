import connection from './connection.ts'
import { RandomQuote } from '../../models/quote.ts'

const db = connection

export async function getAllRandomQuotes(): Promise<RandomQuote[]> {
  return db('quotes').select()
}

// Fetch data by ID
export async function getRandomQuotesById(id: number): Promise<RandomQuote | undefined> {
  return db('quotes').where({ id }).select().first()   
}

// Add a new task
export async function addQuote( quote: string, author: string ): Promise<number[]> {
  return db('quotes').insert({ quote, author })
}


// Update an existing task
export async function updateQuote(
  id: number, 
  quote: string, 
  author: string 
  ): Promise<number> {
  return db('quotes') .where('id', id).update({ id, quote, author })
}

// Delete a task
export async function deleteQuote(id: number): Promise<number> {
  return db('quotes')
    .where({ id })
    .del()
}