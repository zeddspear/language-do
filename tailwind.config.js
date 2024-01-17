/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                mountbattenPink: "#93748A",
                coolGray: "#9F9FAD",
                columbiaBlue: "#AECFDF",
                tiffanyBlue: "#81E4DA",
                aquamarine: "#47E5BC",
            },
        },
    },
};
