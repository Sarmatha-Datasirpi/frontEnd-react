import { useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState([
    { title: 'My new website', body: 'Aquaa..', author: 'Shara', id: 1 },
    { title: 'Welcome party!', body: 'Birthdayy...', author: 'Yoshi', id: 2 },
    { title: 'Web dev tool tips', body: 'Aquaa...', author: 'Shara', id: 3 }
  ])

  return (
    <div className="home">
      <BlogList blogs={blogs} title="All Updates" />
      <BlogList blogs={blogs.filter(blog => blog.author === 'Shara')} title="Shara's Updates" />
    </div>
  );
}
 
export default Home;
