import P from 'prop-types';
import { PostCard } from '../PostCard';
import './styles.css';

export const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post, index) => (
        <PostCard id={post.id} title={post.title} cover={post.cover} body={post.body} key={index} />
      ))}
    </div>
  );
};
Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: P.array,
};
