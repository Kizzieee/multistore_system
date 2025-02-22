import { useState } from "react";
import HomeRestaurants from "./HomeRestaurants";
import AccountModal from "../Account/AccountModal";
import "../style.css";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="mt-5">
      <HomeRestaurants />
    </div>
  );
}

export default Home;
