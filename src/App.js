import Account_Login from "../src/Account/Account_Login";
import Account_View from "../src/Account/Account_View";
import Home from "../src/Main/Home";
import Checkout from "./Main/Checkout";
import Restaurant from "./Main/Restaurant";
import Nagivation from "./Navigation";
import Orders from "./Store/Orders";
import OwnResto from "./Store/OwnResto";
import Store_Creation from "./Store/Store_Creation";
import "./style.css";

function App() {
  return (
    <div>
      <Account_Login />
      {/* <Account_View /> */}
      {/* <Home /> */}
      {/* <Restaurant /> */}
      {/* <Nagivation /> */}
      {/* <Checkout /> */}
      {/* <OwnResto /> */}
      {/* <Orders /> */}
    </div>
  );
}

export default App;
