document.addEventListener(
    "DOMContentLoaded",
    () => {

        createStars();

        createPetals();

    }
);


function createStars() {

    const container =
        document.getElementById(
            "stars"
        );


    for (
        let i = 0;
        i < 150;
        i++
    ) {

        const star =
            document.createElement(
                "span"
            );


        star.className =
            "star";


        star.style.left =
            Math.random() * 100 + "%";


        star.style.top =
            Math.random() * 100 + "%";


        star.style.animationDelay =
            Math.random() * 5 + "s";


        container.appendChild(
            star
        );

    }

}


function createPetals() {

    const container =
        document.getElementById(
            "petals"
        );


    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const petal =
            document.createElement(
                "span"
            );


        petal.className =
            "petal";


        petal.style.left =
            Math.random() * 100 + "%";


        petal.style.animationDuration =
            8 +
            Math.random() * 10 +
            "s";


        petal.style.animationDelay =
            Math.random() * 10 +
            "s";


        container.appendChild(
            petal
        );

    }

}
