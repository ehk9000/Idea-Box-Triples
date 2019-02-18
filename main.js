//QUERY SELECTORS
var saveBtn = document.querySelector('#save-btn');
var ideas = JSON.parse(localStorage.getItem('posts')) || [];
var cardBtnClick = document.querySelector('.card-container');
var cardBodyClick = document.querySelector('.card-container');
console.log(ideas);


//EVENT LISTENERS
saveBtn.addEventListener('click', createIdea)
cardBtnClick.addEventListener('click', buttonListener)
cardBodyClick.addEventListener('focusout', saveContent )

// cardBodyClick.addEventListener('click', cardListener)




//FUNCTIONS
function createIdea() {
  var title = document.querySelector('.title-style').value;
  var body = document.querySelector('.body-style').value;
  var newIdea = new Idea(title, body, Date.now());
  ideas.push(newIdea);
  newIdea.saveToStorage(ideas)
  publishIdea(newIdea);
}

function publishIdea(newIdeaObj) {
  var cardContainer = document.querySelector('.card-container');
  cardContainer.innerHTML += `<article id="card-template" class="idea-card-style" data-id=${newIdeaObj.cardId}>
    <section class="card-style">
      <h2 id="card-title" class="card-title-style" contenteditable="true" data-title="card-title">${newIdeaObj.title}</h2>
      <p id="card-body" class="card-body-style" contenteditable="true" data-body="body-content">${newIdeaObj.body}</p>
    </section>
    <div class="card-box-style">
      <img id="downvote-btn" class="downvote" src="images/downvote.svg">
      <img id="upvote-btn" class="upvote" src="images/upvote.svg">
      <h3 class="quality-style">Quality: <span id="quality-qualifer">Swill
      </span></h3>
      <img id="delete-btn" class="delete-button" src="images/delete.svg">
    </div>
  </article>`
}

loadPage (ideas)
// window.addEventListener('load', loadPage);
function loadPage (oldIdeas) {
  ideas = [];
  for (let i = 0; i < oldIdeas.length; i++) {
  var newIdea = new Idea(oldIdeas[i].title, oldIdeas[i].body, oldIdeas[i].cardId);
     ideas.push(newIdea);
     publishIdea(newIdea);
   }
}
function buttonListener(e) {
  if(e.target.classList.contains('delete-button')){
    deleteIdea(e);
  }
  if(e.target.classList.contains('upvote'))  {
    upVote(e);
  }
  if (e.target.classList.contains('downvote')){
    downVote(e);
  }
}

function deleteIdea(e) {
  var card = e.target.parentElement.parentElement;
    card.remove();
  var cardId = card.getAttribute('data-id');
    ideas[0].deleteFromStorage(cardId);
}

function upVote(e)  {
    var quality = e.target.nextSibling.nextSibling.lastChild;
    if (quality.innerText === 'Swill') {
      quality.innerText = 'Plausible'
    } else {
      quality.innerText = 'Genius'
    }
}

function downVote(e){
  var quality = e.target.nextSibling.nextSibling.nextSibling.nextSibling.lastChild;
  if (quality.innerText === 'Genius'){
    quality.innerText = 'Plausible'
  } else {
    quality.innerText = 'Swill'
  }
}
// onclick of card, set the edited card to global variable
// onclick of body, check what global variable is to local storage
// if different, find index of old card, then splice in new

function saveContent (e) {
  var targetElement = e.target;
  var text = e.target.textContent;
  var targetIdea = findCard(e);
  targetIdea.updateContent(targetElement, text);
  targetIdea.saveToStorage();
}

function findCard (e) {
  var card = e.target.parentElement.parentElement;
  var cardId = parseInt(card.getAttribute('data-id'));
  return ideas.find(function(idea) {
    return idea.cardId === cardId;
  });
}



// function findIdea(e) {
//    let dataIndex = parseInt(e.target.closest(".idea-card").getAttribute("data-index"));
//     return ideas.find( (idea) =>  {
//        return idea.index === dataIndex;
//     });
//   }

  // function editExistingCard(e) {
  //   var targetIdea = findIdea(e);
  //   var newValue = e.target.innerHTML;
  //   if(e.target.className === "idea-card-title") {
  //       targetIdea.title = newValue;
  //   }
  //   if (e.target.className === "idea-card-paragraph") {
  //       targetIdea.body = newValue;
  //   }
  //   targetIdea.updateContent();
  //   targetIdea.saveToStorage(ideas);
  // } 


// function editBody(e) {
//   var body = document.getElementById('card-body');
//   var edit = body.innerHTML;
// }
// check if global card is set
// if the global card is set, check if the card exists in ideas
// if globacard exists in ideas, that means card was clicked but no change happended so leave the update
// else, didnt find globl card with ideas, so and update happended
// loop through ideas and see if any of the cardId is equal to global card
// find index from matching ideas, replace that index with global card
// save to storage
function mainListener(e) {
  var cardBodyClick = document.querySelector('.card-container');
  var title = document.getElementById('card-title').innerHTML;
  var body = document.getElementById('card-body').innerHTML;
  // updateContent(ideas);

}
