import Account_Registration from "../src/Account/Account_Registration";
import Account_Login from "../src/Account/Account_Login";
import Account_View from "../src/Account/Account_View";
import Home from "../src/Main/Home";
import Restaurant from "./Main/Restaurant";
import Checkout from "./Main/Checkout";
import OwnResto from "./Store/OwnResto";
import Store_Creation from "./Store/Store_Creation";
import Nagivation from "./Main/Navigation";
import Orders from "./Store/Orders";
import "./style.css";

function App() {
  return (
    <div>
      {/* <Account_Registration /> */}
      {/* <Account_Login /> */}
      {/* <Account_View /> */}
      {/* <Home /> */}
      {/* <Restaurant /> */}
      {/* <Checkout /> */}
      <OwnResto />
      {/* <Orders /> */}
    </div>
  );
}

export default App;
