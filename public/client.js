document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('blog-entry-form');
    const titleInput = form.querySelector('#title');
    const contentInput = form.querySelector('#content');
    const previewDiv = document.getElementById('preview');

    // Function to update the preview
    function updatePreview() {
        const title = titleInput.value;
        const content = contentInput.value;

        // Update the inner HTML of the preview div with the title and content
        previewDiv.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
        `;
    }

    // Update the preview when the title or content input changes
    titleInput.addEventListener('input', updatePreview);
    contentInput.addEventListener('input', updatePreview);

    // Default blog title function
    function defaultBlogTitle() {
        const day = new Date().getDate().toString();
        const month = new Date().getMonth().toString();
        const year = new Date().getFullYear().toString().slice(2);

        let fullMain = [];
        fullMain.push(day, (parseInt(month)+1).toString(), year);
        fullMain = fullMain.join('.');
        
        const hour = new Date().getHours().toString();
        const minute = new Date().getMinutes().toString();

        let local = [];
        local.push(hour, minute);
        local = local.join(':');

        const TITLE = fullMain + " - " + local;
        return TITLE;
    }

    // Set default blog title when the page loads
    titleInput.value = defaultBlogTitle();

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the values of title and content from the form
        const title = titleInput.value;
        const content = contentInput.value;
        console.log('Title:', JSON.stringify({ title, content }));
        
        // Send a POST request to the server with the form data
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => {
            if (response.ok) {
                // Reset the form after successful submission
                form.reset();
                alert('Blog entry submitted successfully!');
                // Update preview after reset
                updatePreview();
                // Set default blog title after reset
                titleInput.value = defaultBlogTitle();
            } else {
                throw new Error('Failed to submit blog entry');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting the blog entry');
        });
    });
});
