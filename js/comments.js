let currentStoryId = null;


async function loadComments(storyId) {

    currentStoryId = storyId;

    const container =
        document.getElementById(
            "comments"
        );

    container.innerHTML =
        "<p>Loading comments...</p>";


    const {
        data,
        error
    } =
        await supabaseClient
            .from("comments")
            .select("*")
            .eq(
                "story_id",
                storyId
            )
            .is(
                "parent_id",
                null
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(error);

        container.innerHTML =
            "<p>Failed to load comments.</p>";

        return;

    }


    container.innerHTML = "";


    if (!data.length) {

        container.innerHTML = `

            <p>
                There are no comments yet.
                Be the first to leave a comment.
            </p>

        `;

        return;

    }


    data.forEach(comment => {

        const element =
            document.createElement(
                "div"
            );

        element.className =
            "comment";

        element.innerHTML = `

            <strong>
                ${escapeHTML(comment.author_name)}
            </strong>

            <p>
                ${escapeHTML(comment.content)}
            </p>

            <button
                onclick="
                    likeComment('${comment.id}')
                "
            >
                Like
                (${comment.likes || 0})
            </button>

            <button
                onclick="
                    replyTo('${comment.id}')
                "
            >
                Reply
            </button>

        `;

        container.appendChild(
            element
        );

    });

}


async function sendComment() {

    const name =
        document
            .getElementById("commentName")
            .value
            .trim();

    const content =
        document
            .getElementById("commentText")
            .value
            .trim();


    if (!name || !content) {

        alert(
            "Enter your username and your comment."
        );

        return;

    }


    const {
        error
    } =
        await supabaseClient
            .from("comments")
            .insert({

                story_id:
                    currentStoryId,

                author_name:
                    name,

                content:
                    content,

                likes:
                    0

            });


    if (error) {

        console.error(error);

        alert(
            "The post could not be published."
        );

        return;

    }


    document
        .getElementById("commentText")
        .value = "";


    await loadComments(
        currentStoryId
    );

}


async function likeComment(id) {

    const {
        data
    } =
        await supabaseClient
            .from("comments")
            .select("likes")
            .eq(
                "id",
                id
            )
            .single();


    if (!data)
        return;


    await supabaseClient
        .from("comments")
        .update({

            likes:
                (data.likes || 0) + 1

        })
        .eq(
            "id",
            id
        );


    await loadComments(
        currentStoryId
    );

}


function escapeHTML(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}
