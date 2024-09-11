import "@/App.css";
import Navbar from "@/components/Header";
import AppContainer from "@/components/AppContainer";
import Toast from "@/shared/widgets/Toast.tsx";
import { useAppSelector } from "@/redux/store/store.ts";

function App() {
  const auth = useAppSelector((state) => state.auth);

  return (
    <>
      <Navbar auth={auth} />
      <AppContainer />
      <Toast />
    </>
  );
}

export default App;
