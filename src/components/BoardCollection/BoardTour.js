import React, { useEffect } from "react";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

const GuidedTour = () => {
    const gifPaths = [
        process.env.PUBLIC_URL + '/assets/giphy1.gif',
        process.env.PUBLIC_URL + '/assets/giphy2.gif',
        process.env.PUBLIC_URL + '/assets/giphy3.gif'
        
    ];

    useEffect(() => {
        const tour = new Shepherd.Tour({
            defaultStepOptions: {
                classes: "shepherd-theme-arrows",
                when: {
                    show: function() {
                        const stepIndex = tour.steps.indexOf(this);
                        var gifContainer = document.createElement('div');
                        gifContainer.style.backgroundImage = `url(${gifPaths[stepIndex]})`;
                        gifContainer.style.backgroundSize = 'cover';
                        gifContainer.style.width = '100%';
                        gifContainer.style.height = '400px'; // Set height according to your needs
                        this.el.querySelector('.shepherd-text').appendChild(gifContainer);
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
                    text: "End",
                    action: tour.next
                }
            ],
        ];

        // Add steps with different GIFs
        gifPaths.forEach((path, index) => {
            tour.addStep({
                id: `step${index + 1}`,
                text: `Welcome to the guided tour! This is step ${index + 1}.`,
                attachTo: {
                    element: ".element-selector",
                    on: "bottom"
                },
                buttons: stepButtons[index]
            });
        });

        tour.start();

        return () => {
            tour.complete();
        };
    }, []); // Empty dependency array ensures the effect runs once after the initial render

    return null;
};

export default GuidedTour;
