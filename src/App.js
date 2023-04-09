import "./assets/css/styles.scss"
import {Rotas} from "./rotas";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <ToastContainer/>
            <div className="App" id="main">
                <Rotas/>
            </div>
        </>
    );
}

export default App;
