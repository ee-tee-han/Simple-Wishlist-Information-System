// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDogvLUTRwFCL_3IhNWw3hEqDoGpWW31i8",
  authDomain: "my-demo-project-5c294.firebaseapp.com",
  databaseURL: "https://my-demo-project-5c294-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-demo-project-5c294",
  storageBucket: "my-demo-project-5c294.appspot.com",
  messagingSenderId: "432621906457",
  appId: "1:432621906457:web:d8108fdfd6d1fd3142d888",
  measurementId: "G-FSC0HG4VHV"
};

firebase.initializeApp(firebaseConfig); 

const btn = document.getElementById("submit-data"); 

btn.addEventListener("click", saveWishlist); 

/////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to save items, movies, and game data
function saveWishlist() { 
  // Each set retrieves the input from the html and assigns it to a variable
  const itemField = document.getElementById("item"); 
  const itemFieldValue = itemField.value; 

  const movieField = document.getElementById("movie");
  const movieFieldValue = movieField.value;

  const gameField = document.getElementById("game");
  const gameFieldValue = gameField.value;

  const musicField = document.getElementById("music");
  const musicFieldValue = musicField.value;

  // This is the logic. Decides if input boxes are empty or not
  if(itemField.value == "" && movieField.value == "" && gameField.value == "" && musicField.value == ""){ // If all input boxes are empty, this alert will pop up
    alert("Please enter an input in the box(es) provided.");
  } 
  else { // If there is an input...
    if (itemField.value !== "") { // If the value is not empty, the value will be pushed to firebase, saved under the respective node.
      const itemData = firebase.database().ref('/items').push();
      itemData.set({ item: itemFieldValue });
    }
    if (movieField.value !== "") {
      const movieData = firebase.database().ref('/movies').push();
      movieData.set({ movie: movieFieldValue });
    }
    if (gameField.value !== "") {
      const gameData = firebase.database().ref('/games').push();
      gameData.set({ game: gameFieldValue });
    }
    if (musicField.value !== "") {
      const musicData = firebase.database().ref('/songs').push();
      musicData.set({ music: musicFieldValue });
    }
    alert("Successfully saved data.");
  }

  itemField.value = ''; // Clears the input box
  gameField.value = ''; 
  movieField.value = ''; 
  musicField.value = ''; 
  itemField.focus(); //Focuses cursor on item input box
} 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Displays item data as a list and allows deletion on click
const itemRef = firebase.database().ref('/items');
itemRef.on("child_added", function(data) {
  displayItemAsList(data);
});


function displayItemAsList(data) { 
  const datapoint = data.val();
  const newListItem = document.createElement('li');
  newListItem.innerHTML = `${datapoint.item}`;
  
  // Adds click event listener to remove data on click
  newListItem.addEventListener("click", function() {
    itemRef.child(data.key).remove(); // Remove from Firebase
    newListItem.remove(); // Remove from UI
  });

  document.getElementById('item-list').appendChild(newListItem);
}

// Displays movie data as a list and allows deletion on click
const movieRef = firebase.database().ref('/movies');
movieRef.on("child_added", function(data) {
  displayMovieAsList(data);
});

function displayMovieAsList(data) {
  const datapoint = data.val();
  const newListItem = document.createElement('li');
  newListItem.innerHTML = `${datapoint.movie}`;
  
  // Adds click event listener to remove data on click
  newListItem.addEventListener("click", function() {
    movieRef.child(data.key).remove(); // Remove from Firebase
    newListItem.remove(); // Remove from UI
  });

  document.getElementById('movie-list').appendChild(newListItem);
}

// Displays game data as a list and allows deletion on click
const gameRef = firebase.database().ref('/games');
gameRef.on("child_added", function(data) {
  displayGameAsList(data);
});

function displayGameAsList(data) {
  const datapoint = data.val();
  const newListItem = document.createElement('li');
  newListItem.innerHTML = `${datapoint.game}`;
  
  // Adds click event listener to remove data on click
  newListItem.addEventListener("click", function() {
    gameRef.child(data.key).remove(); // Remove from Firebase
    newListItem.remove(); // Removes from UI
  });

  document.getElementById('game-list').appendChild(newListItem);
}

// Displays music data as a list and allows deletion on click
const musicRef = firebase.database().ref('/songs');
musicRef.on("child_added", function(data) {
  displayMusicAsList(data);
});

function displayMusicAsList(data) {
  const datapoint = data.val();
  const newListItem = document.createElement('li');
  newListItem.innerHTML = `${datapoint.music}`;
  
  // Adds click event listener to remove data on click
  newListItem.addEventListener("click", function() {
    musicRef.child(data.key).remove(); // Remove from Firebase
    newListItem.remove(); // Removes from UI
  });

  document.getElementById('music-list').appendChild(newListItem);
}

//////////////////////////////////////////////////////////////////////////////////

// Text to speech button
let isSpeaking = false; // Variable to track speaking state

// Function to handle text-to-speech
function readAloud() {
  const synth = window.speechSynthesis; // Get the speech synthesis object
  const utterance = new SpeechSynthesisUtterance(); // Create a new utterance object

  // Get the whole document's text content
  const pageText = document.body.innerText || document.body.textContent;
  utterance.text = pageText; // Set the text to be read aloud

  utterance.rate = 1;        // Speed (1 is normal speed)
  utterance.pitch = 1;       // Pitch (1 is normal pitch)
  utterance.volume = 1;      // Volume (1 is full volume)

  // Checks if speaking and act accordingly
  if (!isSpeaking) {
    synth.speak(utterance);  // Speak the text
    isSpeaking = true;        // Update speaking state
  } else {
    synth.cancel();           // Stop the speech
    isSpeaking = false;       // Update speaking state
  }
}

// Attaches an event listener to the button
document.getElementById("tts-button").addEventListener("click", readAloud);

/////////////////////////////////////////////////////////////////////////////////////////

//Colourblind button

const colourblindButton = document.getElementById('colourblind-toggle');
const body = document.body;

// Add an event listener to toggle the colorblind mode
colourblindButton.addEventListener('click', function() {
  body.classList.toggle('colourblind-mode');
});
