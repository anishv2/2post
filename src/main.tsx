import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ThemeDataProvider from "./context/ThemeContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store.ts";
import { AxiosInterceptor } from "./shared/services/AxiosInterceptor.tsx";
import { PersistGate } from "redux-persist/integration/react";
import TanstackQueryProvider from "./shared/TanstackQueryProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Provider store={store}>
    <AxiosInterceptor>
      <ThemeDataProvider>
          <PersistGate loading={null} persistor={persistor}>
            <TanstackQueryProvider>
              <App />
            </TanstackQueryProvider>
          </PersistGate>
      </ThemeDataProvider>
    </AxiosInterceptor>
    </Provider>
  </Router>
);
