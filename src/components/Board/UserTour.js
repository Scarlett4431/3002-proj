import intro from 'intro.js';
import 'intro.js/minified/introjs.min.css';

function handleStart(){
    intro()
        .setOptions({
            steps: [
                {
                    title: 'Welcome!',
                    intro: 'This app is fantastic!',
                },
            ]


        })
}