import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <StrictMode>
      <RouterProvider router={router}>
        <App />
        </RouterProvider>
    </StrictMode>
    </Provider>,
)
