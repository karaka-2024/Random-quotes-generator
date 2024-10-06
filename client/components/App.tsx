import { useFruits } from '../hooks/useRandomQuotes.ts'

function App() {
  const { data: quote, refetch } = useQuery('randomQuote', fetchRandomQuote);
  const mutation = useMutation(addQuote, {
    onSuccess: () => {
      refetch();
    },
  });

  const [newQuote, setNewQuote] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ quote: newQuote, author });
    setNewQuote('');
    setAuthor('');
  };

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h1>Random Quote Generator</h1>
      {quote && (
        <blockquote>
          <p>"{quote.quote}"</p>
          <footer>— {quote.author}</footer>
        </blockquote>
      )}
      <button onClick={refetch}>Get a Random Quote</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Quote"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Add Quote</button>
      </form>
      {mutation.isLoading && <p>Adding Quote...</p>}
    </div>
  );
}

export default App;