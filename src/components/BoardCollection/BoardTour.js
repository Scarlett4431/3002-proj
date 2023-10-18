import React, { useEffect } from "react";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";


const GuidedTour = ({ onComplete }) => {
    const gifPaths = [
        process.env.PUBLIC_URL + '/assets/step1.gif',
        process.env.PUBLIC_URL + '/assets/step2.gif',
        process.env.PUBLIC_URL + '/assets/step3.gif',
        process.env.PUBLIC_URL + '/assets/step4.gif'
    ];

    useEffect(() => {
        const tour = new Shepherd.Tour({
            defaultStepOptions: {
                classes: "shepherd-theme-arrows",
                when: {
                    show: function() {
                        const stepIndex = tour.steps.indexOf(this);
                        const shepherdTextElement = this.el.querySelector('.shepherd-text');
                        
                        // Create and prepend the new GIF to the shepherd text
                        const gifImage = document.createElement('img');
                        gifImage.src = gifPaths[stepIndex];
                        gifImage.style.width = '100%';
                        gifImage.style.height = 'auto'; // Maintains the aspect ratio
                        shepherdTextElement.insertBefore(gifImage, shepherdTextElement.firstChild);

                        const shepherdContentElement = this.el.querySelector('.shepherd-content');
                        shepherdContentElement.style.backgroundColor = 'rgba(128, 128, 255, 0.1)';

                        const buttons = this.el.querySelectorAll('.shepherd-button');
                        buttons.forEach((button, idx) => {
                            button.style.backgroundImage = 'linear-gradient(to right,#FF7CA1, #A67BEB)';
                            button.style.color = 'white'; // Set text color to white for visibility against the gradient
                        });
                    }
                }
            }
        });

        const stepButtons = [
            [
                {
                    text: "Next",
                    action: tour.next
                }
            ],
            [
                {
                    text: "Previous",
                    action: tour.back,
                    classes: "shepherd-button-secondary"
                },
                {
                    text: "Next",
                    action: tour.next
                }
            ],
            [
                {
                    text: "Previous",
                    action: tour.back,
                    classes: "shepherd-button-secondary"
                },
                {
                    text: "Next",
                    action: tour.next
                }
            ],
            [   {
                text: "Previous",
                action: tour.back,
                classes: "shepherd-button-secondary"
                },
                {
                    text: "End",
                    action: tour.next
                }
            ],
        ];

        const stepTexts = [
            "Create boards for your household! If you have shared responsibilities with multiple groups, feel free to create multiple ones!",
            "Create Lists and Cards to manage your tasks! From grocery shopping lists to daily errands, we help you to keep track of everything!",
            "Tasks finished? Clicking on the radio button will move them to the bottom of the list. You can also easily drag and drop to move your cards from one list to another!",
            "Want to invite a member to join the board collaboration? Entering their email address will be all you need to do! (Please ask them to register an account before you invite)"
        ];

        gifPaths.forEach((path, index) => {
            tour.addStep({
                id: `step${index + 1}`,
                text: stepTexts[index],
                attachTo: {
                    element: ".element-selector",
                    on: "bottom"
                },
                buttons: stepButtons[index]
            });
        });

        tour.on('complete', () => {
            if (onComplete && typeof onComplete === 'function') {
              onComplete();
            }
        });

        tour.start();

        return () => {
            tour.complete();
        };
    }, [onComplete]);

    return null;
};

export default GuidedTour;
