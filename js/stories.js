function renderStories(
    list = stories
) {

    const grid =
        document.getElementById(
            "storyGrid"
        );


    grid.innerHTML = "";


    list.forEach(story => {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "story-card";


        card.innerHTML = `

            <span class="story-status">

                ${escapeHTML(
                    story.statusLabel
                )}

            </span>


            <h3>

                ${escapeHTML(
                    story.title
                )}

            </h3>


            <p>

                ${escapeHTML(
                    story.description
                )}

            </p>


            <div class="story-tags">

                ${story.tags
                    .map(tag => `

                        <span class="tag">

                            ${escapeHTML(tag)}

                        </span>

                    `)
                    .join("")
                }

            </div>


            <div class="story-meta">

                <span>

                    ${story.chapters}
                    capítulos

                </span>


                <button
                    onclick="
                        openStory(${story.id})
                    "
                >
                    Read about
                </button>

            </div>

        `;


        grid.appendChild(
            card
        );

    });

}


function openStory(id) {

    const story =
        stories.find(
            story =>
                story.id === id
        );


    if (!story)
        return;


    const modal =
        document.getElementById(
            "storyModal"
        );


    document.getElementById(
        "modalTitle"
    ).textContent =
        story.title;


    document.getElementById(
        "modalDescription"
    ).textContent =
        story.description;


    document.getElementById(
        "modalStatus"
    ).textContent =
        story.statusLabel;


    modal.classList.add(
        "open"
    );


    loadComments(
        story.id
    );

}


function closeStory() {

    document
        .getElementById(
            "storyModal"
        )
        .classList
        .remove(
            "open"
        );

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderStories();

    }
);
