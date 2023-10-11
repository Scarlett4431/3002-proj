import React, { useEffect } from "react";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

const GuidedTour = () => {
    const gifPath = process.env.PUBLIC_URL + '/assets/giphy.gif';
  useEffect(() => {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        classes: "shepherd-theme-arrows",
        when: {
            show: function() {
                var gifContainer = document.createElement('div');
                gifContainer.style.backgroundImage = `url(${gifPath})`;
                gifContainer.style.backgroundSize = 'cover';
                gifContainer.style.width = '100%';
                gifContainer.style.height = '400px'; // Set height according to your needs
                this.el.querySelector('.shepherd-text').appendChild(gifContainer);
            }
        }
      }
    });





    tour.addStep({
      id: "step1",
      text: "Welcome to the guided tour! This is step 1.",
      attachTo: {
        element: ".element-selector",
        on: "bottom"
      },
      buttons: [
        {
          text: "Next",
          action: tour.next
        }
      ]
    });

    // Add more steps as needed

    tour.start();

    return () => {
      tour.complete();
    };
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return null; // GuidedTour component doesn't render anything, it's just for handling the tour logic
};

export default GuidedTour;
