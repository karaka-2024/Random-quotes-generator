import request from 'superagent'

export interface RandomQuote {
  id: number
  quote: string
  author: string
}

export interface QuoteData {
  id: number;
}


const rootUrl = 'http://localhost:3000/api/v1'

// Fetch all Random quotes
export async function getRandomQuotes(): Promise<RandomQuote[]> {
  try {
    const response = await request.get(`${rootUrl}/quotes`)
    return response.body as RandomQuote[]
  } catch (error) {
    console.error('Error fetching random quotes:', error)
    throw new Error(`Error fetching random quotes: ${(error as Error).message}`)
  }
}

// Fetch a Quote by ID
export async function getRandomQuoteById(id: number): Promise<RandomQuote> {
  try {
    const response = await request.get(`${rootUrl}/quotes/${id}`)
    return response.body as RandomQuote
  } catch (error) {
    throw new Error(`Error fetching random quote with ID ${id}: ${(error as Error).message}`)
  }
}

// Add a new quote
export async function addQuote(newQuote: { quote: string, author: string }): Promise<QuoteData> {
  try {
    const response = await request.post(`${rootUrl}/quotes`).send(newQuote)
    return response.body as QuoteData
  } catch (error) {
    throw new Error(`Error adding quote: ${(error as Error).message}`)
  }
}

// Update an existing quote
export async function updateQuote(updatedQuote: { id: number; quote?: string; author?: string }): Promise<void> {
  try {
    await request.patch(`${rootUrl}/quotes/${updatedQuote.id}`).send({
      quote: updatedQuote.quote,
      author: updatedQuote.author,
    })
  } catch (error) {
    throw new Error(`Error updating quote with ID ${updatedQuote.id}: ${(error as Error).message}`)
  }
}

// Delete a task
export async function deleteQuote(id: number): Promise<void> {
  try {
    await request.delete(`${rootUrl}/quotes/${id}`)
  } catch (error) {
    throw new Error(`Error deleting quote with ID ${id}: ${(error as Error).message}`)
  }
}