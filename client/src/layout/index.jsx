import PropTypes from "prop-types";
import miku from "../assets/miku.png";

const AuthLayout = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center py-3 h-20 shadow-md bg-white">
        <img src={miku} alt="Logo" width={100} height={60} />
      </header>

      {children}
    </>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
