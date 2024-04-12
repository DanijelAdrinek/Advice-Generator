/**
 * Handles all the logic that is related to advice API, including displaying it
 */
class AdviceDisplayHandler {
    constructor() {
        const card = document.getElementById('card');
        this.title = card.querySelector(".title");
        this.adviceElement = card.querySelector(".advice");
    }
    /**
     * Makes a loading animation appear
     */
    _loading() {
        this.title.innerHTML = 'Loading...';
        this.adviceElement.innerHTML = '<div class="loader"></div>';
    }
    
    /**
    * Displays the new data that we fetched
    * 
    * @typedef {Object} AdviceObject
    * @property {string|null} advice - The advice message.
    * @property {number|null} id - The unique identifier for the advice.
    * @property {boolean|null} error - Any error message, or null if no error occurred.
    */
    _displayData({advice, id, error}) {
    
        if(!error) {
            this.title.textContent = `${id}`;
            this.adviceElement.textContent = `${advice}`;
        } else {
            this.title.textContent = '';
            this.adviceElement.textContent = 'Error: Couldnt fetch advice data';
        }
    }

    /**
     * Process data function to format advice and id.
     *
     * @param {object} advice - the advice to be processed
     * @param {number} id - the id associated with the advice
     * @return {object} formatted advice and id
     */
    _processData({advice, id}) {
        const newAdvice = `“${advice}”`;
        const newId = `ADVICE #${id}`;

        return {advice: newAdvice, id: newId}
    }

    /**
     * A function that fetches random advice from an API and displays it.
     */
    fetchAdvice = async () => {
    
        this._loading();
    
        try {
            // Unfortunately their website is experiencing bugs at the time of writing this code, when it comes to returning random advice, and returns the same one every time, which is why I have made it so it returns a random number that I can use as ID to get a random advice
            const id = Math.floor(Math.random() * 200);
            const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
            const adviceObject = await response.json();
            const processedData = this._processData(adviceObject.slip);
            this._displayData(processedData);

        } catch(error) {
            this._displayData({error: true});
            console.log(error);
        }
    }
}

const adviceHandler = new AdviceDisplayHandler();

const dice = document.getElementById('dice');
dice.addEventListener('click', adviceHandler.fetchAdvice);