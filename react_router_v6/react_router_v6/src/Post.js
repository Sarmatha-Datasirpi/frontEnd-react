import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    return (
        <article className="post">
            <Link to={`post/${post.id}`}>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
            </Link>
            <a href={post.body} target="_blank" rel="noopener noreferrer" className="postBody">{
                (post.body).length <= 25
                    ? post.body
                    : `${(post.body).slice(0, 25)}...`
            }Read More</a>
        </article>
    )
}

export default Post
