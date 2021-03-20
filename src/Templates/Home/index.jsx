import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/loadPost';
import { Posts } from '../../Components/Posts';
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextInput';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [pages, setPages] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = pages + postsPerPage >= allPosts.length;

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleloadPosts = useCallback(async (pages, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(pages, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleloadPosts(0, postsPerPage);
  }, [handleloadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = pages + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);
    setPosts(posts);
    setPages(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <div className="container">
      <div className="search-container">
        <TextInput searchValue={searchValue} handleChange={handleChange} />
        {!!searchValue && (
          <>
            <h2>
              <strong>Search:</strong> {searchValue}
            </h2>
          </>
        )}
      </div>
      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>No posts found</p>}

      {!searchValue && <Button text="Load more posts +" onClick={loadMorePosts} disabled={noMorePosts} />}
    </div>
  );
};

export default Home;
