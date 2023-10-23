import { Link } from 'react-router-dom';
import ReactSwitch from 'react-switch';
import { useContext } from 'react';
import { themeContext } from './App';

const Nav = ({ search, setSearch }) => {
    const {theme,toggleTheme}=useContext(themeContext);
    return (
        <themeContext.Provider value={{theme,toggleTheme}}>
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><ReactSwitch onChange={toggleTheme} checked={theme ==="dark"}></ReactSwitch></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="post">Post</Link></li>
                <li><Link to="about">About</Link></li>
            </ul>
        </nav>
        </themeContext.Provider>
    )
}

export default Nav
