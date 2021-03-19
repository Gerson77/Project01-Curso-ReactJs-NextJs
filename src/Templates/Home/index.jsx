import { Component } from 'react'

import './styles.css'

import { loadPosts } from '../../utils/loadPost'
import { Posts } from '../../Components/Posts'
import { Button } from '../../Components/Button'
import { TextInput } from '../../Components/TextInput'

class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    pages: 0,
    postsPerPage: 10,
    searchValue: ''
  }

  async componentDidMount(){
      await this.loadPosts()
  }

  loadPosts = async () => {
    const { pages, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(pages, postsPerPage),
      allPosts: postsAndPhotos,
    })
  }
  loadMorePosts = () => {
    const { 
      pages, 
      postsPerPage, 
      allPosts, 
      posts 
    } = this.state;

    const nextPage = pages + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

    posts.push(...nextPosts);
    this.setState({posts, pages: nextPage})
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
  }

  render(){
    const { posts, pages, postsPerPage, allPosts, searchValue} = this.state;
    const noMorePosts = pages + postsPerPage >= allPosts.length;
    
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase()
      );
    })
    : posts ;

    return(
      <div className="container">
      <div className="search-container">
       
        <TextInput 
          searchValue={searchValue} 
          handleChange={this.handleChange}
        />
         {!!searchValue && (
          <>
            <h2> <strong>Search:</strong> {searchValue}</h2><br/>
          </>
        )}
      </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>No posts found</p>
        )}
        
        {!searchValue && (
          <Button 
            text="Load more posts +" 
            onClick={this.loadMorePosts}
            disabled={noMorePosts}  
          />
        )}
        
      </div>
    )
  }
}

export default Home;