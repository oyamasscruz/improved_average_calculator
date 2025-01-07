const averagesGrades = [];
let resultAverage;

const setDefaultValue = prompt('Please insert your defaul value');

function defaultGradeHandler() {
  defaultGrade.textContent = `${parseInt(setDefaultValue.trim())}`;
};

const updateUi = () => {
  if (averagesGrades.length === 0) {
    section.style.display = 'block';
  } else {
    section.style.display = 'none';
  }
};

const addNewAverage = () => {
  const inputGradeValue = inputGrade.value.trim();
  const inputSubjectValue = inputSubject.value.trim();

  const newAvaregeGrade = {
    subject: inputSubjectValue,
    grade: inputGradeValue
  };

  averagesGrades.push(newAvaregeGrade);
  renderNewAverage(newAvaregeGrade.subject, newAvaregeGrade.grade);
  clearInputs();
  closeModal();
  toggleBackdrop();
  updateUi();
};

const renderNewAverage = (subject, grade) => {
  const newAverageElement = document.createElement('li');
  newAverageElement.classList = 'subject-border';
  
  if (inputGrade.value >= parseInt(setDefaultValue)) {
    resultAverage = 'Aproved';
  } else {
    resultAverage = 'Reproved';
  }

  newAverageElement.innerHTML = `<h2>${subject}</h2>
  <div class="subject-list-item">
    <div class="subject-list__info"
      <p>${grade}</p>
    </div>
    <div class="subject-result">
      <img class="lecture-list__img" src="./assets/images/${resultAverage}.png" alt="${resultAverage}">
      <h2>${resultAverage}</h2>
    </div>
  </div>
  `;
  subjectList.append(newAverageElement);
};


const clearInputs = () => {
  inputSubject.value = '';
  inputGrade.value = '';
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const closeModal = () => {
  addModal.classList.remove('visible');
};

const showModal = () => {
  addModal.classList.add('visible');
  toggleBackdrop();
};

const backdropClickHandler = () => {
  closeModal();
  toggleBackdrop();
  clearInputs();
};

defaultGradeHandler();

startBtn.addEventListener('click', showModal);
backdrop.addEventListener('click', backdropClickHandler);
modalInsertBtn.addEventListener('click', addNewAverage);
