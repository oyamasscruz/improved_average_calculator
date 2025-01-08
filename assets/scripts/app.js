const averagesGrades = [];
let finalAverage;
let result;
let setDefaultValue;

function settingDefaultValue() {
  setDefaultValue = prompt('Please insert your defaul value');

  if(
    isNaN(setDefaultValue) ||
    !setDefaultValue ||
    +setDefaultValue < 0
    +setDefaultValue > 9
  ) {
    alert('Please inset valide Default grade (between 1 and 9)')
    setDefaultValue = prompt('Please insert your defaul value');
  } else {
    alert("Let's find out if you're able to proced to next year or not!");
  }
}
settingDefaultValue();

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
  const inputSubjectValue = inputSubject.value.trim();
  const inputFirstGradeValue = inputFirstGrade.value.trim();
  const inputSecondGradeValue = inputSecondGrade.value.trim();
  const inputThirdGradeValue = inputThirdGrade.value.trim();
  const inputQuarterGradeValue = inputQuarterGrade.value.trim();

  if(
    !inputSubjectValue ||
    !inputFirstGradeValue ||
    !inputSecondGradeValue ||
    !inputThirdGradeValue ||
    !inputQuarterGradeValue ||
    +inputFirstGradeValue < 0 ||
    +inputFirstGradeValue > 10 || 
    +inputSecondGradeValue < 0 ||
    +inputSecondGradeValue > 10 || 
    +inputThirdGradeValue < 0 ||
    +inputThirdGradeValue > 10 ||
    +inputQuarterGradeValue < 0 ||
    +inputQuarterGradeValue > 10
  ) {
    alert('Please insert a valid Grades (values between 0 and 10)');
    return;
  } 

  const newAverage = {
    subject: inputSubjectValue,
    firstGrade: inputFirstGradeValue,
    secondGrade: inputSecondGradeValue,
    thirdGrade: inputThirdGradeValue,
    quarterGrade: inputQuarterGradeValue
  };

  averagesGrades.push(newAverage);
  renderNewAverage(newAverage.subject, newAverage.firstGrade, newAverage.secondGrade, newAverage.thirdGrade, newAverage.quarterGrade);
  clearInputs();
  closeModal();
  toggleBackdrop();
  updateUi();
};

const finalAverageHandler = () => {
  const sum = parseInt(inputFirstGrade.value.trim()) + parseInt(inputSecondGrade.value.trim()) + parseInt(inputThirdGrade.value.trim()) + parseInt(inputQuarterGrade.value.trim());
  const averages = sum / 4;
  return averages;
};

const renderNewAverage = (subject, firstGrade, secondGrade, thirdGrade, quarterGrade, finalAverage, result) => {
  const newAverageElement = document.createElement('li');
  newAverageElement.classList = 'subject-border';
  finalAverage = finalAverageHandler();

  if(finalAverage >= parseInt(setDefaultValue)) {
    result = 'Aproved';
  } else {
    result = 'Reproved';
  }

  newAverageElement.innerHTML = `
  <div class="card-average">
    <h2>${subject}</h2>
    <button class="toggle-btn" aria-label="show/hidde grades">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
  <table class="subject-table">
    <thead>
      <tr>
        <th>1º Trimester</th>
        <th>2º Trimester</th>
        <th>3º Trimester</th>
        <th>4º Trimester</th>
        <th>Final Average</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${firstGrade}</td>
        <td>${secondGrade}</td>
        <td>${thirdGrade}</td>
        <td>${quarterGrade}</td>
        <td>${finalAverage}</td>
        <td class="result-table">
          <div class="subject-result">
            <img class="lecture-list__img" src="./assets/images/${result}.png" alt="${result}">
            <span class="span-result">${result}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  `;

  subjectList.append(newAverageElement);
};


const clearInputs = () => {
  inputSubject.value = '';
  inputFirstGrade.value = '';
  inputSecondGrade.value = '';
  inputThirdGrade.value = '';
  inputQuarterGrade.value = '';
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const closeModal = () => {
  addModal.classList.remove('visible');
};

const cancelModalButton = () => {
  closeModal();
  toggleBackdrop();
  clearInputs();
}

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
modalCancelBtn.addEventListener('click', cancelModalButton);

subjectList.addEventListener('click', (event) => {
  if (event.target.closest('.toggle-btn')) {
    const toggleButton = event.target.closest('.toggle-btn');
    toggleButton.classList.toggle('active');

    const contentTable = toggleButton.parentElement.nextElementSibling;
    if (contentTable) {
      contentTable.classList.toggle('hidden');
    }
  }
});