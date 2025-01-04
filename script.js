document.addEventListener('DOMContentLoaded', function () {

    const dogInput = document.getElementById('dog-input');
    const humanOutput = document.getElementById('human-output');
    const humanInput = document.getElementById('human-input');
    const dogOutput = document.getElementById('dog-output');
    const recordDogSoundButton = document.getElementById('record-dog-sound');
    const translateToBarkButton = document.getElementById('translate-to-bark');

    const originalInput = document.getElementById('original-input');
    const suggestedTranslation = document.getElementById('suggested-translation');
    const submitFeedbackButton = document.getElementById('submit-feedback');
    const feedbackMessage = document.getElementById('feedback-message');

    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loadingOverlay.appendChild(loader);
    document.body.appendChild(loadingOverlay);

    loadingOverlay.style.display = 'none';

    // Simulated AI model (simple word-mapping)
    const dogToHumanDictionary = {
        'woof': 'hello',
        'bark': 'attention',
        'grrr': 'upset',
        'whine': 'sad',
        'ruff': 'play',
        'awoo': 'lonely',
        'yip': 'excited',
        'bow wow': 'happy',
       'woof woof': 'i am hungry' ,
       'aroo': 'i need to go out'
    };

    const humanToDogDictionary = {
        'hello': 'woof',
        'attention': 'bark',
        'upset': 'grrr',
        'sad': 'whine',
        'play': 'ruff',
        'lonely': 'awoo',
        'excited': 'yip',
         'happy': 'bow wow',
         'i am hungry' : 'woof woof' ,
          'i need to go out': 'aroo'
    };

    // Helper Functions

    function showLoading() {
        loadingOverlay.style.display = 'flex';
    }

    function hideLoading() {
        loadingOverlay.style.display = 'none';
    }

    function updateUI(outputElement, message, isError = false) {
        outputElement.value = message;
        outputElement.classList.toggle('error', isError);
    }

    function isValidInput(text) {
        const trimmedText = text.trim();
        return trimmedText.length > 0 && trimmedText.length <= 200;
    }

     function showFeedbackMessage(message, isSuccess = true) {
        feedbackMessage.textContent = message;
        feedbackMessage.classList.toggle('show', true);
         feedbackMessage.style.backgroundColor = isSuccess ? '#e6f7ff' : '#ffebee'; // Light blue or light red

        setTimeout(() => {
           feedbackMessage.classList.remove('show');
        }, 3000);
    }



   function simulateRecording() {
    return new Promise(resolve => {
          // Add a simulated delay to mimic real-world recording
           setTimeout(() => {
             const randomBarkSounds = ['woof', 'bark', 'grrr', 'whine', 'ruff','awoo', 'yip','bow wow','woof woof', 'aroo'];
             const randomBark = randomBarkSounds[Math.floor(Math.random() * randomBarkSounds.length)];
             resolve(randomBark);
         }, 2000); // Simulate 2 second recording

       });
    }


    // Event listeners

    recordDogSoundButton.addEventListener('click', async function () {
        try{
           showLoading();

            const simulatedBark = await simulateRecording();
           dogInput.value = simulatedBark;

            hideLoading();
             translateDogToHuman();
        }
        catch (error){
             console.error('Recording Error:', error);
             hideLoading();
              updateUI(humanOutput, 'Recording Error', true);
        }
    });



    function translateDogToHuman() {

        const dogText = dogInput.value.trim().toLowerCase();

        if(!isValidInput(dogText)){
             updateUI(humanOutput, 'Invalid dog input. Please enter a valid sound.', true);
            return;
        }
        showLoading();
         setTimeout(() => {
             if (dogToHumanDictionary[dogText]) {
                 updateUI(humanOutput, dogToHumanDictionary[dogText]);
             } else {
                 updateUI(humanOutput, 'Translation not found for the given bark.', true);
             }
             hideLoading();
        }, 1000);

    }


    translateToBarkButton.addEventListener('click', function () {
          const humanText = humanInput.value.trim().toLowerCase();
           if(!isValidInput(humanText)){
             updateUI(dogOutput, 'Invalid human input. Please enter a valid message.', true);
             return;
         }
         showLoading();
        setTimeout(() => {
            let dogTranslation = humanToDogDictionary[humanText];
             if (dogTranslation) {
                  updateUI(dogOutput, dogTranslation)
             } else {
                updateUI(dogOutput, 'Translation not found for your message.', true);
             }
             hideLoading();
        }, 1000);
    });


      submitFeedbackButton.addEventListener('click', function () {
        const originalText = originalInput.value.trim();
        const suggestedText = suggestedTranslation.value.trim();

           if(!isValidInput(originalText) || !isValidInput(suggestedText) ){
                showFeedbackMessage('Please enter both valid original input and suggested translation.', false);
                return;
           }

           showLoading();

            setTimeout(() => {
               // simulating sending feedback to server here
               showFeedbackMessage('Thank you for your feedback!', true);
               originalInput.value = '';
               suggestedTranslation.value = '';
                hideLoading();
           }, 1500);
    });

    //  Advanced error handling
     dogInput.addEventListener('input', function (){
         updateUI(humanOutput, '', false);
     });
     humanInput.addEventListener('input', function (){
         updateUI(dogOutput, '', false);
     });

     // Smooth UI interactions
      window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollPos = window.scrollY;
            if (scrollPos > 100) {
              header.classList.add('scrolled');
           } else {
                header.classList.remove('scrolled');
          }
      });

     // Initial loading animation
      window.addEventListener('load', () => {
           showLoading();
             setTimeout(() => {
                 hideLoading();
            }, 2000);
       });


  //   Lazy loading setup
  const images = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
           if (entry.isIntersecting) {
                  const image = entry.target;
                image.src = image.getAttribute('src');  // set real src

                 observer.unobserve(image);

            }
      });
    });

    images.forEach(image => {
        observer.observe(image);
    });

});
