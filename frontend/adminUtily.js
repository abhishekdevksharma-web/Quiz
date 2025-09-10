function showLoader() {
  document.getElementById('loaderContainer').style.display = 'flex';
}

function hideLoader() {
  document.getElementById('loaderContainer').style.display = 'none';
}
export async function findQuizByUser() {

  try {
    let response = await fetch('/findQuizByUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    let result = await response.json();
    return result
  } catch (error) {
    console.error('Error:', error);
  }
}

export function expand(drawer) {
  // let drawer = document.getElementById("history-drawer")
  let parentDiv = drawer.closest(".quiz-entry");
  const a = parentDiv.children
  a[3].classList.toggle("drawer-animation")
  // showLoader1()
  console.log(a[2]);

}

let questionCounter = 0;

export function addQuestion() {
  questionCounter++;
  const template = document.getElementById('questionTemplate');
  const clone = template.content.cloneNode(true);
  const form = clone.querySelector('.question-form');
  // Set a unique data attribute for the question card
  form.dataset.questionId = questionCounter;

  // Update radio button group name for existing options
  const radioInputs = clone.querySelectorAll('.option-radio');
  radioInputs.forEach((radio, index) => {
    radio.name = 'correctAnswer_' + questionCounter;
    radio.value = index;
  });

  document.getElementById('questionsContainer').appendChild(clone);
}

export function removeOption(button) {
  const optionDiv = button.closest('.option');
  optionDiv.remove();
}
export function addOption(button) {
  const form = button.closest('form');
  const container = form.querySelector('.options-container');
  const optionCount = container.querySelectorAll('.option').length + 1;
  const questionId = form.dataset.questionId;
  const optionDiv = document.createElement('div');
  optionDiv.className = 'option';
  optionDiv.innerHTML = `
          <input type="radio" class="option-radio" name="correctAnswer_${questionId}" value="${optionCount - 1}">
          <input type="text" name="option[]" placeholder="Option ${optionCount}" required>
          <button type="button" class="remove-option" onclick="removeOption(this)">×</button>
        `;
  container.appendChild(optionDiv);
}
export function removeQuestion(button) {
  const card = button.closest('.question-card');
  card.remove();
}
export function copyCode(e) {
  let codeElement = e.parentElement.querySelector("code");
  const text = codeElement.textContent;
  navigator.clipboard.writeText(text).catch(err => {
    console.error("Copy failed", err);
  });
}
export function addData(quizes) {
  const history_container = document.getElementById("history-container")
  history_container.innerHTML = ""
  showLoader()
  let n = 1;
  const currentDate = new Date();
  quizes.data.forEach((e) => {
    const element = document.createElement("div")
    element.setAttribute("class", "quiz-entry")
    element.setAttribute("id", `quiz-entry${n}`)
    element.innerHTML = `<div class="quiz-info"
  <div class="quiz-content">
    <h2>${e.quizName}</h2>
    <p>${e.quizSubject}</p>
    <div class="quiz-meta">
      <span>📄${e.Date}</span>
      <span>📅${e.submission}</span>
    </div>
  </div>
  <div class="quiz-options">
    <button onclick="expand(this)" class="option-btn details-btn" data-target="quiz-entry${n}" aria-expanded="false">
      Details
    </button>
  </div>
</div>
<div id="codeContainer" 
       style="background: #2d2d2d; color: #007bff; border-radius: 4px; position: relative; 
              padding: 0.75rem 1rem; margin: 1rem 0; font-family: Consolas, Menlo, Monaco, 
              'Courier New', monospace; line-height: 1.5; overflow-x: auto;">
    <code id="codeText${n}"><a target="_blank"style="text-decoration: none; color:white;" href="http://localhost:3000/?quizID=${e.quizID}">http://localhost:3000/?quizID=${e.quizID}</a>
</code>
    <button onclick="copyCode(this)" 
            style="position: absolute; top: 0.5rem; right: 0.5rem; background: #4f4f4f; 
                   color: #fff; border: none; border-radius: 4px; padding: 4px 8px; 
                   cursor: pointer; font-size: 0.9rem; transition: background 0.2s ease;">
      Copy
    </button>
  </div>

  <div id="copiedAlert" 
       style="display: none; margin-top: 10px; color: green; font-weight: bold; font-size: 0.9rem;">
    Copied!
  </div>
<div class="history-drawer" id="history-drawer">
  <div class="search-box">
    <input type="text" placeholder="Search...">
  </div>
  <table>
    <caption>Student Results</caption>
    <thead>
      <tr>
        <th>Student Name</th>
        <th>AFN</th>
        <th>Total Questions</th>
        <th>Obtained Marks</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  
</div>

          `
    history_container.appendChild(element)
    n++;
    console.log(e.quizID);
  })
  hideLoader()

}