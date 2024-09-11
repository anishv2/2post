import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  

const queryClient=new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
});

const TanstackQueryProvider = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

export default TanstackQueryProvider;