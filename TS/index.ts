let loan: { amount: number; isSet: boolean } = {
  amount: 100000,
  isSet: false,
};

let interest: { procentage: number; isSet: boolean } = {
  procentage: 0.03,
  isSet: false,
};

let year: { amount: number; isSet: Boolean } = {
  amount: 25,
  isSet: false,
};

//the calculate button to start the calculation
const btn = document.getElementById("calculateBtn") as HTMLButtonElement;
btn.addEventListener("click", () => {
  if (loan.isSet && year.isSet && interest.isSet) {
    startFormat();
  } else {
    alertUser();
  }
});
//the loan amount input and checks
const loanInput = document.getElementById("loan") as HTMLInputElement;
loanInput.addEventListener("blur", () => {
  if (numberCheck(loanInput.value)) {
    if (loanCheck(Number(loanInput.value.replace(",", ".")))) {
      loanInput.classList.remove("invalid");
      loan.amount = Number(loanInput.value.replace(",", "."));
      loan.isSet = true;
    } else {
      loanInput.classList.add("invalid");
      loan.isSet = false;
    }
  } else {
    loanInput.classList.add("invalid");
    loan.isSet = false;
  }
  if (loanInput.value == "") {
    loanInput.classList.remove("invalid");
  }
});
//the interest input field and checks
const interestInput = document.getElementById("interest") as HTMLInputElement;
interestInput.addEventListener("blur", () => {
  if (numberCheck(interestInput.value)) {
    if (procentCheck(Number(interestInput.value.replace(",", ".")))) {
      interestInput.classList.remove("invalid");
      interest.procentage =
        Number(interestInput.value.replace(",", ".")) / 1200;
      interest.isSet = true;
    } else {
      interestInput.classList.add("invalid");
      interest.isSet = false;
    }
  } else {
    interestInput.classList.add("invalid");
    interest.isSet = false;
  }
  if (interestInput.value == "") {
    interestInput.classList.remove("invalid");
  }
});
//the years input and checks
const yearsInput = document.getElementById("years") as HTMLInputElement;
yearsInput.addEventListener("blur", () => {
  if (numberCheck(yearsInput.value)) {
    if (yearCheck(Number(yearsInput.value.replace(",", ".")))) {
      yearsInput.classList.remove("invalid");
      year.amount = Number(yearsInput.value.replace(",", "."));
      year.isSet = true;
    } else {
      yearsInput.classList.add("invalid");
      year.isSet = false;
    }
  } else {
    yearsInput.classList.add("invalid");
    year.isSet = false;
  }
  if (yearsInput.value == "") {
    yearsInput.classList.remove("invalid");
  }
});

//function section
function monthlyPay(loan: number, interest: number, months: number): number {
  return (
    loan *
    ((interest * (1 + interest) ** months) / ((1 + interest) ** months - 1))
  );
}

function totalInterest(
  months: number,
  totalPaid: number,
  monthPaid: number
): number {
  return months * monthPaid - totalPaid;
}

function formatMoney(unformatted: number): string {
  return unformatted.toLocaleString("sv-SE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function numberCheck(x: any): boolean {
  return /^[0-9]+([.,][0-9]+)?$/.test(x);
}

function yearCheck(year: number): boolean {
  if (year <= 50 && year > 0) {
    return true;
  }
  return false;
}

function procentCheck(procentage: number): boolean {
  if (procentage < 30 && procentage > 0) {
    return true;
  }
  return false;
}

function loanCheck(amount: number): boolean {
  if (amount > 0.01 && amount < 1000000000) {
    return true;
  }
  return false;
}

function monthlyInterest(leftoverLoan: number = loan.amount) {
  return leftoverLoan * interest.procentage;
}

function startFormat() {
  let monthly: number = monthlyPay(
    loan.amount,
    interest.procentage,
    year.amount * 12
  );
  let amortering: number;
  let paidInterest: number;
  let leftoverloan = loan.amount;
  let totalInterest: number = 0;
  const outDiv = document.getElementById("output") as HTMLDivElement;

  const amortPlan = document.createElement("div");
  amortPlan.innerHTML = `<pre>| Months | Remaining loan | Interest Paid | Amortization |</pre>`;
  for (let month = 0; month < year.amount * 12; month++) {
    paidInterest = monthlyInterest(leftoverloan);
    totalInterest += paidInterest;
    amortering = monthly - paidInterest;
    leftoverloan -= amortering;
    const newP = document.createElement("pre");
    newP.innerHTML = `| ${String(month + 1).padEnd(6)} | ${formatMoney(
      leftoverloan
    ).padEnd(14)} | ${formatMoney(paidInterest).padEnd(13)} | ${formatMoney(
      amortering
    ).padEnd(12)} |`;

    amortPlan.appendChild(newP);
  }
  outDiv.innerHTML = `<h1>Your repayment plan!</h1>
  <h2>The details</h2>
  <p>total loan: ${formatMoney(loan.amount)} sek</p>
  <p>Annual Interest: ${interest.procentage * 1200}%</p>
  <p>Loan duration: ${year.amount} years</p>
  <p>Monthly paid: ${formatMoney(monthly)} sek</p>
  <p>Total interest: ${formatMoney(totalInterest)} sek</p>
  <p>Total paid: ${formatMoney(loan.amount + totalInterest)} sek</p>
  `;

  outDiv.appendChild(amortPlan);
}

function alertUser() {
  alert(
    "The data provide is wrong or missing.\nData should be in numbers for each field.\nLoan: 0 - 1 000 000 000\ninterest: 0-30\nyears: 0-50"
  );
}
