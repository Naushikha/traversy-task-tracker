import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>Task Tracker</h1>
      {location.pathname.split('/').pop() === "" && (
        <Button
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

// Default props
Header.defaultProps = {
  title: "No user",
};

Header.propTypes = {
  // title: PropTypes.string,
};

export default Header;
