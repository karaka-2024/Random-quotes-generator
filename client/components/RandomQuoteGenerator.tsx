import { useState, useEffect } from 'react'
import { RandomQuote } from '../../models/quote'
import { useRandomQuotes, useAddQuote, useDeleteQuote, useUpdateQuote, useQuoteById } from '../hooks/useRandomQuotes'
import '../styles/main.css'

export default function RandomQuoteGenerator() {
  const { data: quotes = [], isPending, error, isError } = useRandomQuotes()
  const addQuoteMutation = useAddQuote()
  const updateQuoteMutation = useUpdateQuote()
  const deleteQuoteMutation = useDeleteQuote()

  // State for handling new quote input, edit, and delete operations
  const [quoteInput, setQuoteInput] = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [editId, setEditId] = useState<number | null>(null)

  // Fetch the specific quote by id when editing
  const { data: selectedQuote } = useQuoteById(editId)

  // Automatically update the input fields when selectedQuote changes (prefill logic)
  useEffect(() => {
    if (selectedQuote) {
      setQuoteInput(selectedQuote.quote)
      setAuthorInput(selectedQuote.author)
    }
  }, [selectedQuote])

  const handleAddQuote = () => {
    if (quoteInput && authorInput) {
      addQuoteMutation.mutate({ quote: quoteInput, author: authorInput })
      setQuoteInput('')
      setAuthorInput('')
    }
  }

  const handleUpdateQuote = (id: number) => {
    if (quoteInput && authorInput) {
      updateQuoteMutation.mutate({ id, quote: quoteInput, author: authorInput })
      setQuoteInput('')
      setAuthorInput('')
      setEditId(null) // Reset edit mode after updating
    }
  }

  const handleDeleteQuote = (id: number) => {
    deleteQuoteMutation.mutate(id)
  }

  const handleRandomQuote = () => {
    if (quotes && quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length)
      alert(`Random Quote: ${quotes[randomIndex].quote} - ${quotes[randomIndex].author}`)
    }
  }

  return (
    <div className="quote-container">
      <h1>Random Quote Generator</h1>

      {/* Display loading state */}
      {isPending ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading quotes: {error.message}</p>
      ) : (
        <>
          {/* Show random quote */}
          <button onClick={handleRandomQuote}>Show Random Quote</button>

          {/* Quote list */}
          <ul>
            {quotes?.map((quote: RandomQuote) => (
              <li key={quote.id}>
                <p>
                  &quot;{quote.quote}&quot; - {quote.author}
                </p>
                <button onClick={() => setEditId(quote.id)}>Edit</button>
                <button onClick={() => handleDeleteQuote(quote.id)}>Delete</button>
              </li>
            ))}
          </ul>

          {/* Add / Edit Quote */}
          <div className="quote-input">
            <input
              type="text"
              placeholder="Enter quote"
              value={quoteInput}
              onChange={(e) => setQuoteInput(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter author"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
            />
            {editId ? (
              <button onClick={() => handleUpdateQuote(editId)}>Update Quote</button>
            ) : (
              <button onClick={handleAddQuote}>Add Quote</button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
