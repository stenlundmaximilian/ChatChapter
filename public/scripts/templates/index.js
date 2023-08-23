function updateHeadingOnClick(event) {
    // Prevent the default link behavior
    event.preventDefault();

    // Get the clicked link's text
    const text = event.target.innerText;

    // Get the <h1> element
    const headingElement = document.querySelector('h1');
    const titleInput = document.getElementById('title-input');

    // Fade out the heading
    headingElement.style.opacity = 0;

    // Wait for the fade-out animation to complete
    setTimeout(() => {
        // Update the heading text with the text from the clicked link
        headingElement.innerText = text;
        titleInput.value = text;

        // Trigger the fade-in animation
        headingElement.style.opacity = 1;
    }, 500); // Set this timeout to match the transition duration

}



