import { HomeProvider } from "../../../context/U/home";
import FeatHome from "../../../features/U/home";

const Home = () => {
  return (
    <HomeProvider>
      <FeatHome />
    </HomeProvider>
  );
};

export default Home;
