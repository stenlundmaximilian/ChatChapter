function updateHeadingOnClick(event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Get the clicked link's text
    const text = event.target.innerText;

    // Get the <h1> element
    const headingElement = document.querySelector('h1');
    const titleInput = document.getElementById('title-input');
    titleInput.value = text;

    // Update the heading text with the text from the clicked link
    headingElement.innerText = text;
}