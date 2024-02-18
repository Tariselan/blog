document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('blog-entry-form');
    const titleInput = form.querySelector('#title');
    const contentInput = form.querySelector('#content');
    const previewDiv = document.getElementById('preview');
// i will EVENTUALLY make this code work but rn i am tooo tired
   // Function to convert Markdown content to HTML
//function convertMarkdownToHtml(markdown) {
    // Regular expressions to match markdown patterns
  //  const headerRegex = /^(#+) (.+)$/gm;
 //   const italicRegex = /\*(.*?)\*/gm;
 //   const boldRegex = /_(.*?)_/gm;
  //  const ulRegex = /^(\s*-\s.+?(?:\n|$))+/gm;
 
    // Convert markdown patterns to HTML
 //   let html = markdown
 ////       .replace(headerRegex, (match, p1, p2) => `<h${p1.length}>${p2}</h${p1.length}>`)
   //     .replace(italicRegex, '<i>$1</i>')
   //     .replace(boldRegex, '<b>$1</b>');

    // Wrap any remaining content in <p> tags
   // html = html.replace(/^(?!<\/?(h\d|ul)>)(.*?)$/gm, (match, p1) => {
   //     if (typeof p1 !== 'undefined') {
            // Check if p1 is not empty
     //       if (p1.trim() !== '') {
      //         // Check for italic and bold formatting before wrapping in <p> tags
     ///           p1 = p1.replace(italicRegex, '<i>$1</i>').replace(boldRegex, '<b>$1</b>');
     //           return `<p>${p1}</p>`;
    //        }
   //     }
   //     // If p1 is undefined or empty, return an empty string
   //     return '';
  //  });

 ////   return html;
//}


    // Function to update the preview
    function updatePreview() {
        const title = titleInput.value;
        const content = contentInput.value;

        // // Convert Markdown content to HTML
        // const htmlContent = convertMarkdownToHtml(content);
        // Update the inner HTML of the preview div with the title and HTML content
        previewDiv.innerHTML = `
            <h3>${title}</h3>
            ${content}
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
        fullMain.push(day, (parseInt(month) + 1).toString(), year);
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

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the values of title and content from the form
        const title = titleInput.value;
        const htmlContent = contentInput.value;
        console.log('Title:', JSON.stringify({ title, htmlContent }));

        // Send a POST request to the server with the form data
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, htmlContent })
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
