// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "YOUR COHORT NAME HERE";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/COHORT-NAME/players');
    if (!response.ok) {
      throw new Error("Failed to fetch players");
    }
    return await response.json();
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
    throw err; // Re-throw the error to propagate it to the caller
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch player #${playerId}`);
    }
    return await response.json();
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    throw err;
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${API_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });
    if (!response.ok) {
      throw new Error("Failed to add a new player");
    }
    return await response.json();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
    throw err;
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to remove player #${playerId}`);
    }
  } catch (err) {
    console.error(`Whoops, trouble removing player #${playerId} from the roster!`, err);
    throw err;
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  const playerCardsContainer = document.getElementById("player-cards-container");
  playerCardsContainer.innerHTML = ""; // Clear the existing content

  if (playerList.length === 0) {
    mainElement.textContent = "No players available.";
    return;
  }

  // Loop through the playerList and create card elements for each player
  playerList.forEach((player) => {
    // Create and append player card elements to the main element
    // Include buttons for "See details" and "Remove from roster"
    // Attach event listeners to the buttons
  });
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = ""; // Clear the existing content

  // Create and append a card element for the single player
  // Include a "Back to all players" button and attach an event listener
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  const formElement = document.getElementById("new-player-form");
  formElement.innerHTML = "";

}
  const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
  
    renderNewPlayerForm();
  };
  
  // This script will be run using Node when testing, so here we're doing a quick
  // check to see if we're in Node or the browser, and exporting the functions
  // we want to test if we're in Node.
  if (typeof window === "undefined") {
    module.exports = {
      fetchAllPlayers,
      fetchSinglePlayer,
      addNewPlayer,
      removePlayer,
      renderAllPlayers,
      renderSinglePlayer,
      renderNewPlayerForm,
    };
  } else {
    init();
  }
