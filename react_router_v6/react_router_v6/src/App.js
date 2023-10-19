import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title:"Learn how to create two simple responsive side navigation bar and main navbar in ReactJS",
      datetime: "Aug 01, 2023 11:17:36 AM",
      body:"https://www.codinn.dev/articles/how-to-create-simple-two-responsive-side-navigation-bar-and-dynamic-navbar-in-react-js"
    },
    {
      id: 2,
      title: "Table Pagination tutorial in Reactjs using Server Side API data with Paginate, CSS example",
      datetime: "Sep 17, 2023 10:17:00 AM",
      body: "https://www.codinn.dev/articles/reactjs-pageable-tablepagination-react-paginate-server-side-pagination"
    },
    {
      id: 3,
      title: "Conditional Rendering in React using &&" ,
      datetime: "July 19, 2023 12:17:36 PM",
      body: "https://www.codinn.dev/articles/what-is-conditional-rendering-in-react-using-&&"
    },
    {
      id: 4,
      title: "setState not updating State immediately in Functional Component",
      datetime: "May 24, 2023 9:17:36 AM",
      body: "https://www.codinn.dev/articles/setstate-not-updating-state-immediately-in-functional-component"
    }
  ])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/');
  }

  return (
    <Routes>
      <Route path="/" element={<Layout
        search={search}
        setSearch={setSearch}
      />}>
        <Route index element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route index element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          <Route path=":id" element={<PostPage
            posts={posts}
            handleDelete={handleDelete}
          />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
