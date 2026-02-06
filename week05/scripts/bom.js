// Select elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Retrieve chapters from localStorage or initialize as empty array
let chaptersArray = getChapterList() || [];

// Populate the list from the stored chapters
chaptersArray.forEach(chapter => {
  displayList(chapter);
});

// Button click event to add a new chapter
button.addEventListener('click', () => {
  if (input.value.trim() !== '') {
    displayList(input.value);
    chaptersArray.push(input.value);
    setChapterList();
    input.value = '';
    input.focus();
  } else {
    alert('Please enter a chapter!');
    input.focus();
  }
});

// Function to display a chapter in the list
function displayList(item) {
  const li = document.createElement('li');
  const deleteButton = document.createElement('button');
  
  li.textContent = item;
  deleteButton.textContent = '❌';
  deleteButton.classList.add('delete');

  li.append(deleteButton);
  list.append(li);

  deleteButton.addEventListener('click', () => {
    list.removeChild(li);
    deleteChapter(item);
    input.focus();
  });
}

// Function to save chaptersArray to localStorage
function setChapterList() {
  localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Function to retrieve chapters from localStorage
function getChapterList() {
  return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Function to delete a chapter from chaptersArray and localStorage
function deleteChapter(chapter) {
  chapter = chapter.slice(0, chapter.length - 1); // Remove the ❌ character
  chaptersArray = chaptersArray.filter(item => item !== chapter);
  setChapterList();
}