document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('blog-entry-form');
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
    title.value = defaultBlogTitle();
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the values of title and content from the form
        const title = form.querySelector('#title').value;
        const content = form.querySelector('#content').value;
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
                title.value = defaultBlogTitle();
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
