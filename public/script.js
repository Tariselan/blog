document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('main section');

    // Function to create a blog entry element
    function createBlogEntry(title, content) {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('blog-entry');

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const contentElement = document.createElement('p');
        contentElement.innerHTML = content;

        entryDiv.appendChild(titleElement);
        entryDiv.appendChild(contentElement);

        return entryDiv;
    }

    // Function to fetch and display blog entries
    function loadBlogEntries() {
        fetch('/entries')
            .then(response => response.json())
            .then(entries => {
                // Reverse the order of entries
                entries.reverse().forEach(entry => {
                    const entryElement = createBlogEntry(entry.title, entry.content);
                    section.appendChild(entryElement);
                });
            })
            .catch(error => {
                console.error('Error fetching blog entries:', error);
            });
    }

    // Call the function to load blog entries when the page loads
    loadBlogEntries();
});
