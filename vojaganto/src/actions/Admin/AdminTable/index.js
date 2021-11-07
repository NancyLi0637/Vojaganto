export const removePost = (table, post) => {
    const filteredPosts = table.state.posts.filter(p => {
      return p.id !== post.id;
    });

    console.log(filteredPosts)
  
    table.setState({
      posts: filteredPosts
    });
};