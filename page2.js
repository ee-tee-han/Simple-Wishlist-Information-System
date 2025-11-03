
const firebaseConfig = {
    apiKey: "AIzaSyDtRNgokFwNjcxn7VMLRHMBpHXmSU2hqwY",
    authDomain: "storage-dcaf9.firebaseapp.com",
    projectId: "storage-dcaf9",
    storageBucket: "storage-dcaf9.appspot.com",
    messagingSenderId: "689122757375",
    appId: "1:689122757375:web:1987900631b908caf71aca",
    measurementId: "G-Q79CZ5DW08"
  };
  
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  
  // Function to handle file upload
  function uploadFile() {
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
  
      if (!file) {
          alert('Please select a file first!');
          return;
      }
  
      const storageRef = storage.ref('uploads/' + file.name);
      const uploadTask = storageRef.put(file);
  
      // Monitor the file upload process
      uploadTask.on('state_changed',
          function (snapshot) {
              // Track progress
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              document.getElementById('uploadStatus').innerHTML = 'Upload is ' + progress + '% done';
          },
          function (error) {
              // Handle unsuccessful uploads
              document.getElementById('uploadStatus').innerHTML = 'Error uploading file: ' + error.message;
          },
          function () {
              // Handle successful uploads
              uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                  document.getElementById('uploadStatus').innerHTML = 'File uploaded successfully!';
                  
                  // Display the file link
                  displayFileLink(file.name, downloadURL);
              });
          }
      );
  }
  
  // Function to display the uploaded file link and remove button
  function displayFileLink(fileName, downloadURL) {
      const fileLinkContainer = document.getElementById('fileLinkContainer');
      
      // Create a div to hold the file display
      const fileDisplay = document.createElement('div');
      fileDisplay.classList.add('file-display');
      fileDisplay.id = fileName; // Set a unique ID for easy removal
  
      // Create an element for file preview
      const filePreview = document.createElement('div');
      
      // Check the file type
      const fileExtension = fileName.split('.').pop().toLowerCase();
      
      if (['png', 'jpg', 'jpeg', 'gif'].includes(fileExtension)) {
          // If it's an image, create an <img> element
          const img = document.createElement('img');
          img.src = downloadURL;
          img.alt = fileName;
          img.style.width = '100px'; // Set width for the preview
          img.style.height = 'auto'; // Maintain aspect ratio
          filePreview.appendChild(img);
      } else {
          // For other file types, show an icon or text
          const text = document.createElement('p1');
          text.innerText = `File: ${fileName} (Click to download)`;
          filePreview.appendChild(text);
      }
  
      // Create a link to download the file
      const fileLink = document.createElement('a');
      fileLink.href = downloadURL;
      fileLink.innerText = `Download ${fileName}`;
      fileLink.target = "_blank"; // Open link in new tab
      fileLink.style.display = 'block'; // Ensure it's on a new line
  
      // Create a remove button
      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remove';
      removeButton.onclick = function() {
          removeFile(fileName, fileDisplay); // Pass the current display element
      };
  
      // Append the file preview, link, and button to the file display
      fileDisplay.appendChild(filePreview);
      fileDisplay.appendChild(fileLink);
      fileDisplay.appendChild(removeButton);
      
      // Append the file display to the container
      fileLinkContainer.appendChild(fileDisplay);
  }
  
  // Function to remove the file from Firebase Storage
  function removeFile(fileName, fileDisplay) {
      const storageRef = storage.ref('uploads/' + fileName);
      
      storageRef.delete().then(function() {
          document.getElementById('uploadStatus').innerHTML = 'File removed successfully!';
          if (fileDisplay) {
              fileDisplay.remove(); // Remove the display element
          }
      }).catch(function(error) {
          document.getElementById('uploadStatus').innerHTML = 'Error removing file: ' + error.message;
      });
  }
  
  // Function to list all files in Firebase Storage
  function listFiles() {
      const storageRef = storage.ref('uploads/');
      
      storageRef.listAll().then(function(result) {
          const fileListContainer = document.getElementById('fileListContainer');
          fileListContainer.innerHTML = ''; // Clear previous file list
  
          result.items.forEach(function(itemRef) {
              // Get the download URL
              itemRef.getDownloadURL().then(function(downloadURL) {
                  // Create a div to hold the file display
                  const fileDisplay = document.createElement('div');
                  fileDisplay.classList.add('file-display');
                  fileDisplay.id = itemRef.name; // Set a unique ID for easy removal
  
                  // Create an element for file preview
                  const filePreview = document.createElement('div');
                  
                  // Check the file type
                  const fileExtension = itemRef.name.split('.').pop().toLowerCase();
                  
                  if (['png', 'jpg', 'jpeg', 'gif'].includes(fileExtension)) {
                      // If it's an image, create an <img> element
                      const img = document.createElement('img');
                      img.src = downloadURL;
                      img.alt = itemRef.name;
                      img.style.width = '100px'; // Set width for the preview
                      img.style.height = 'auto'; // Maintain aspect ratio
                      filePreview.appendChild(img);
                  } else {
                      // For other file types, show an icon or text
                      const text = document.createElement('p');
                      text.innerText = `File: ${itemRef.name} (Click to download)`;
                      filePreview.appendChild(text);
                  }
  
                  // Create a link to download the file
                  const fileLink = document.createElement('a');
                  fileLink.href = downloadURL;
                  fileLink.innerText = `Download ${itemRef.name}`;
                  fileLink.target = "_blank"; // Open link in new tab
                  fileLink.style.display = 'block'; // Ensure it's on a new line
  
                  // Create a remove button
                  const removeButton = document.createElement('button');
                  removeButton.innerText = 'Remove';
                  removeButton.onclick = function() {
                      removeFile(itemRef.name, fileDisplay); // Pass the current display element
                  };
  
                  // Append the file preview, link, and button to the file display
                  fileDisplay.appendChild(filePreview);
                  fileDisplay.appendChild(fileLink);
                  fileDisplay.appendChild(removeButton);
                  
                  // Append the file display to the container
                  fileListContainer.appendChild(fileDisplay);
              });
          });
      }).catch(function(error) {
          console.error('Error listing files: ', error);
      });
  }
  
  // Call listFiles to display files on page load
  listFiles();
  
  // Add an event listener to the upload button
  document.getElementById('uploadButton').addEventListener('click', uploadFile);
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


window.onscroll = function() {
    const footer = document.querySelector('footer');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.bottom = '0'; // Show footer when scrolled to bottom
    } else {
        footer.style.bottom = '-100px'; // Hide footer otherwise
    }
};