import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App.tsx'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
