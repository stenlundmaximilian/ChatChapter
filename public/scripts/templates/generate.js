const dataContainer = document.getElementById('data-container');
const title = dataContainer.getAttribute('data-title');
const id1 = dataContainer.getAttribute('data-id1');
const id2 = dataContainer.getAttribute('data-id2');

async function fetchImage() {
    try {
        const responseImage = await fetch(`/templates/generateImage?_id1=${id1}&_id2=${id2}&title=${title}`);
        if (responseImage.ok) {
            return await responseImage.text();
        } else {
            console.error('Error:', responseImage.status, responseImage.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function fetchParagraphs() {
    try {
        const response = await fetch(`/templates/generateMessage?_id1=${id1}&_id2=${id2}&title=${title}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error:', response.status, response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function createImageElement(imageURL) {
    const imgElement = document.createElement("img");
    imgElement.src = imageURL;
    imgElement.alt = "Generated Image";
    imgElement.className = "stableDiffusion";
    return imgElement;
}

function createParagraphsElement(paragraphs) {
    const fragment = document.createDocumentFragment();
    paragraphs.forEach(paragraph => {
        const pElement = document.createElement('p');
        pElement.textContent = paragraph;
        fragment.appendChild(pElement);
    });

    const paragraphsDiv = document.createElement('div');
    paragraphsDiv.classList.add('paragraphs');
    paragraphsDiv.appendChild(fragment);

    return paragraphsDiv;
}

function createFormElement(paragraphs) {
    const form = document.createElement('form');
    form.classList.add('save-story');
    form.action = '/templates/stories';
    form.method = 'POST';

    const storyInput = document.createElement('input');
    storyInput.type = 'hidden';
    storyInput.name = 'story';
    storyInput.value = JSON.stringify(paragraphs);
    form.appendChild(storyInput);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    form.appendChild(titleInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Save';
    form.appendChild(submitButton);

    return form;
}

async function generateMessage() {
    const loader = document.querySelector(".loader");
    try {
        const imageURL = await fetchImage();
        if (imageURL) {
            const imgElement = createImageElement(imageURL);
            const container = document.getElementById("view"); // Replace "view" with the actual ID of the desired container
            container.appendChild(imgElement);
        }

        const paragraphs = await fetchParagraphs();
        if (paragraphs) {
            const paragraphsDiv = createParagraphsElement(paragraphs);
            const container = document.getElementById("view"); // Replace "view" with the actual ID of the desired container
            container.appendChild(paragraphsDiv);

            const form = createFormElement(paragraphs);
            container.appendChild(form);
        }

        loader.classList.add("loader-hidden");
        loader.addEventListener("transitionend", () => {
            document.body.removeChild(loader);
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Automatically trigger the message generation when the page loads
window.addEventListener('load', generateMessage);