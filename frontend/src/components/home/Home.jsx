import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-black p-9 flex justify-center items-center">
      <div
        className="
h-1/2 w-1/2 bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100
 flex justify-center items-center gap-5"
      >
        <Link to="/user/register">
          <button className="btn btn-primary">Register</button>
        </Link>
        <Link to="/user/Login">
          <button className="btn  btn-accent">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
