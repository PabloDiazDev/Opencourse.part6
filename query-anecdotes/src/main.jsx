import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import  {NotificationContextProvider}  from './components/contexts/NotificationContext'

const queryClient= new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotificationContextProvider>
)