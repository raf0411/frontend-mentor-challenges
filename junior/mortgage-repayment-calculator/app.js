const calculateButton = document.querySelector('.submit-btn');
const clearButton = document.querySelector('.clear-btn');
const monthlyRepaymentsResult = document.getElementById('monthly-result');
const totalRepayResult = document.getElementById('repay-result');

function calculateMonthlyRepayments(mortgageAmount, mortgageTerm, interestRate, mortgageType) {
  let result;

  if (mortgageType.value === "repayment") {
    const decimal = interestRate / 100;
    result = (mortgageAmount * (decimal / 12)) / (1 - Math.pow(1 + (decimal / 12), -12 * mortgageTerm));
    result = result.toFixed(2);
  }
  
  else if (mortgageType.value === "interest_only") {
    const decimal = interestRate / 100;
    result = (mortgageAmount) * (decimal / 12);
    result = result.toFixed(2);
  }

  return result.toLocaleString();
};

function calculateTotalRepayment(monthlyResult, mortgageTerm) {
  let result = monthlyResult * (mortgageTerm * 12);
  result = result.toFixed(2);
  return result;
}

function validateInput() {
  let validateMA = true;
  let validateMTE = true;
  let validateIR = true;
  let validateMT = true;

  const maErrorLbl = document.querySelector('.ma-error-label');
  const mteErrorLbl = document.querySelector('.mte-error-label');
  const irErrorLbl = document.querySelector('.ir-error-label');
  const mtErrorLbl = document.querySelector('.mt-error-label');
  const maSpan = document.querySelector('input[name="mortgage-amount"] + span');
  const mteSpan = document.querySelector('input[name="mortgage-term"] + span');
  const irSpan = document.querySelector('input[name="interest-rate"] + span');

  const mortgageAmount = document.getElementById('mortgage-amount');
  const mortgageTerm = document.getElementById('mortgage-term');
  const interestRate = document.getElementById('interest-rate');
  const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

  if (!mortgageAmount.value) {
    maErrorLbl.style.visibility = 'visible';
    mortgageAmount.style.borderColor = 'hsl(4, 69%, 50%)';
    maSpan.style.backgroundColor = 'hsl(4, 69%, 50%)';
    maSpan.style.color = '#fff';
    validateMA = false;
  } 

  if (!mortgageTerm.value) {
    mteErrorLbl.style.visibility = 'visible';
    mortgageTerm.style.borderColor = 'hsl(4, 69%, 50%)';
    mteSpan.style.backgroundColor = 'hsl(4, 69%, 50%)';
    mteSpan.style.color = '#fff';
    validateMTE = false;
  }
  if (!interestRate.value) {
    irErrorLbl.style.visibility = 'visible';
    interestRate.style.borderColor = 'hsl(4, 69%, 50%)';
    irSpan.style.backgroundColor = 'hsl(4, 69%, 50%)';
    irSpan.style.color = '#fff';
    validateIR = false;
  }
  if (!mortgageType) {
    mtErrorLbl.style.visibility = 'visible';
    validateMT = false;
  }
  
  if (validateMA && validateMTE && validateIR && validateMT) {
    maErrorLbl.style.visibility = 'hidden';
    mortgageAmount.style.borderColor = 'hsla(0, 0%, 0%, .4)';
    maSpan.style.backgroundColor = 'hsl(202, 86%, 94%)';
    maSpan.style.color = 'hsl(200, 24%, 40%)';

    mteErrorLbl.style.display = 'none';
    mteErrorLbl.style.visibility = 'hidden';
    mortgageTerm.style.borderColor = 'hsla(0, 0%, 0%, .4)';
    mteSpan.style.backgroundColor = 'hsl(202, 86%, 94%)';
    mteSpan.style.color = 'hsl(200, 24%, 40%)';

    irErrorLbl.style.display = 'none';
    irErrorLbl.style.visibility = 'hidden';
    interestRate.style.borderColor = 'hsla(0, 0%, 0%, .4)';
    irSpan.style.backgroundColor = 'hsl(202, 86%, 94%)';
    irSpan.style.color = 'hsl(200, 24%, 40%)';

    mtErrorLbl.style.display = 'none';
    mtErrorLbl.style.visibility = 'hidden';

    return true;
  } else {
    return false;
  }
}

function renderResults(monthlyResult, totalRepayment) {
  if (monthlyResult && totalRepayment) {
    let resultHTML = document.querySelector(".empty");
    resultHTML.classList.add('completed');
    resultHTML.classList.remove('empty');

    resultHTML.innerHTML = `
      <div class="header-right">
        <h1>Your results</h1>
        <p>
          Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.
        </p>
      </div>

      <div class="results">
        <div class="upper-result">
          <p>Your monthly repayments</p>
          <p id="monthly-result" class="monthly-result">£${monthlyResult}</p>
        </div>
        <div class="bottom-result">
          <p>Total you'll repay over the term</p>
          <p id="repay-result" class="repay-result">£${totalRepayment}</p>
        </div>
      </div>
    `;
  }
}

calculateButton.addEventListener("click", (e) => {
  e.preventDefault();

  const mortgageAmount = document.getElementById('mortgage-amount');
  const mortgageTerm = document.getElementById('mortgage-term');
  const interestRate = document.getElementById('interest-rate');
  const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

  if (validateInput()) {
    let monthlyResult = calculateMonthlyRepayments(mortgageAmount.value, mortgageTerm.value, interestRate.value, mortgageType);
    let totalRepayment = calculateTotalRepayment(monthlyResult, mortgageTerm.value);
    renderResults(monthlyResult, totalRepayment);
  }
});

clearButton.addEventListener("click", () => {
  const mortgageAmount = document.getElementById('mortgage-amount');
  const mortgageTerm = document.getElementById('mortgage-term');
  const interestRate = document.getElementById('interest-rate');
  const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

  mortgageAmount.value = "";
  mortgageTerm.value = "";
  interestRate.value = "";
  mortgageType.checked = false;
});