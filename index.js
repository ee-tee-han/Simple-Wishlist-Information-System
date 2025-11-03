//Login form
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Check credentials
  if (username === 'JohnDoe' && password === '12345') {
    window.location.href = 'page1.html'; // Redirect to the wishlist page
  } else {
    alert('Invalid username or password.'); // Alert for invalid credentials
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////

//Text to speech button
let isSpeaking = false; // Variable to track speaking state

// Function to handle text-to-speech
function readAloud() {
  const synth = window.speechSynthesis; // Get the speech synthesis object
  const utterance = new SpeechSynthesisUtterance(); // Create a new utterance object

  // Get the whole document's text content
  const pageText = document.body.innerText || document.body.textContent;
  utterance.text = pageText; // Set the text to be read aloud

  // Optional: Customize voice, pitch, and rate
  utterance.rate = 1;        // Speed (1 is normal speed)
  utterance.pitch = 1;       // Pitch (1 is normal pitch)
  utterance.volume = 1;      // Volume (1 is full volume)

  // Check if speaking and act accordingly
  if (!isSpeaking) {
    synth.speak(utterance);  // Speak the text
    isSpeaking = true;        // Update speaking state
  } else {
    synth.cancel();           // Stop the speech
    isSpeaking = false;       // Update speaking state
  }
}

// Attach event listener to the button
document.getElementById("tts-button").addEventListener("click", readAloud);

///////////////////////////////////////////////////////////////////////////////////////////////

// Colorblind button
const colourblindButton = document.getElementById('colourblind-toggle');
const body = document.body;

// Add an event listener to toggle the colorblind mode
colourblindButton.addEventListener('click', function() {
  body.classList.toggle('colourblind-mode');
});