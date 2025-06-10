// main.js
// This script builds the pages dynamically, now with search functionality.

document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const searchInput = document.getElementById('search-input');

    // Function to display posts
    const displayPosts = (postsToDisplay) => {
        if (!blogPostsContainer) return;
        blogPostsContainer.innerHTML = ''; // Clear existing posts

        if (postsToDisplay.length === 0) {
            blogPostsContainer.innerHTML = '<p>No posts found matching your search.</p>';
            return;
        }

        const sortedPosts = postsToDisplay.sort((a, b) => b.id - a.id);
        
        sortedPosts.forEach(post => {
            const postPreview = document.createElement('article');
            postPreview.className = 'post-preview';
            postPreview.innerHTML = `
                <div class="post-meta">
                    <span class="post-date">${post.date}</span>
                    <span class="post-category">${post.category}</span>
                </div>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-summary">${post.summary}</p>
                <a href="single-post.html?id=${post.id}" class="read-more">Read More &rarr;</a>
            `;
            blogPostsContainer.appendChild(postPreview);
        });
    };

    // --- Homepage Logic ---
    if (blogPostsContainer) {
        // Initial display of all posts
        displayPosts(posts);

        // Add event listener for the search input
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredPosts = posts.filter(post => 
                    post.title.toLowerCase().includes(searchTerm) || 
                    post.summary.toLowerCase().includes(searchTerm) ||
                    post.category.toLowerCase().includes(searchTerm)
                );
                displayPosts(filteredPosts);
            });
        }
    }

    // --- Single Post Page Logic ---
    const articleContainer = document.getElementById('article-container');
    if (articleContainer) {
        // Hide search bar on single post page if it exists in the header
        const singlePostSearch = document.querySelector('.search-container');
        if (singlePostSearch) {
            singlePostSearch.style.display = 'none';
        }
        
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id'));
        
        const post = posts.find(p => p.id === postId);

        if (post) {
            document.title = `${post.title} | Harshaad's Hues`;
            articleContainer.innerHTML = `
                <header class="article-header">
                    <div class="article-meta">
                        <span>In <a href="#">${post.category}</a></span>
                        <span class="meta-divider">|</span>
                        <span>Published on ${post.date}</span>
                    </div>
                    <h1 class="article-title">${post.title}</h1>
                </header>
                <div class="article-content">
                    ${post.content}
                    <div class="article-footer">
                        <a href="index.html" class="back-to-blog">&larr; Back to All Posts</a>
                    </div>
                </div>
            `;
        } else {
            articleContainer.innerHTML = `
                <header class="article-header">
                     <h1 class="article-title">Post not found</h1>
                </header>
                <div class="article-content">
                    <p>Sorry, the post you are looking for does not exist. Please return to the homepage.</p>
                     <div class="article-footer">
                        <a href="index.html" class="back-to-blog">&larr; Back to All Posts</a>
                    </div>
                </div>
            `;
        }
    }
});
