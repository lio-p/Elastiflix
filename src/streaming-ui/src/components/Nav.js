
import SearchBar from "./SearchBar";
import logo from '../logo.svg'
import Dropdown from 'react-dropdown';
import users from "../user.js"

function Nav({showSearch, setUser}) {

    const options = [
        { value: users[0], label: users[0].name },
        { value: users[1], label: users[1].name }
    ]

    
      const handleSelect = (option) => {
        setUser(option.value)
      }
    
      const defaultOption = options[0];

    return (
        <div className="nav">
            <a href="/">
                <img
                    className="nav__logo"
                    src={logo}
                    alt=""
                />
            </a>
            {showSearch ? <div className="search_bar">
                <SearchBar />
                <Dropdown controlClassName="dropdown" options={options} onChange={handleSelect} value={defaultOption} placeholder="Select an option" />;

            </div> : <></>}
        </div>
    );
}

// Set default props
Nav.defaultProps = {
    showSearch: false
};

export default Nav;
