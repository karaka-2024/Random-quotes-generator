import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { RandomQuote } from '../../models/quote.ts'
import * as API from '../apis/randomQuotes.ts'

// Hook to fetch tasks
export function useRandomQuotes() {
  const query = useQuery<RandomQuote[]>({
    queryKey: ['quotes'],
    queryFn: API.getRandomQuotes,
  })

  return {
    ...query,
    update: useUpdateQuote(),
    delete: useDeleteQuote(),
    add: useAddQuote(),
  }
}

export function useQuoteMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] })
    },
  })

  return mutation
}


 // Hook to add a new quote
 export function useAddQuote() {
  return useQuoteMutation(API.addQuote)
}

 // Hook to update an existing quote
  export function useUpdateQuote() {
    return useQuoteMutation(API.updateQuote)
  }
  
   // Hook to delete quote
   export function useDeleteQuote() {
    return useQuoteMutation(API.deleteQuote)
  }