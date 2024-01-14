"use strict";
let loan = {
    amount: 100000,
    isSet: false,
};
let interest = {
    procentage: 0.03,
    isSet: false,
};
let year = {
    amount: 25,
    isSet: false,
};
//the calculate button to start the calculation
const btn = document.getElementById("calculateBtn");
btn.addEventListener("click", () => {
    if (loan.isSet && year.isSet && interest.isSet) {
        console.log("it works!");
        startFormat();
    }
});
//the loan amount input and checks
const loanInput = document.getElementById("loan");
loanInput.addEventListener("blur", () => {
    if (numberCheck(loanInput.value)) {
        if (loanCheck(Number(loanInput.value.replace(",", ".")))) {
            loanInput.classList.remove("invalid");
            loan.amount = Number(loanInput.value.replace(",", "."));
            loan.isSet = true;
        }
        else {
            loanInput.classList.add("invalid");
            loan.isSet = false;
        }
    }
    else {
        loanInput.classList.add("invalid");
        loan.isSet = false;
    }
    if (loanInput.value == "") {
        loanInput.classList.remove("invalid");
    }
});
//the interest input field and checks
const interestInput = document.getElementById("interest");
interestInput.addEventListener("blur", () => {
    if (numberCheck(interestInput.value)) {
        if (procentCheck(Number(interestInput.value.replace(",", ".")))) {
            interestInput.classList.remove("invalid");
            interest.procentage =
                Number(interestInput.value.replace(",", ".")) / 1200;
            interest.isSet = true;
        }
        else {
            interestInput.classList.add("invalid");
            interest.isSet = false;
        }
    }
    else {
        interestInput.classList.add("invalid");
        interest.isSet = false;
    }
    if (interestInput.value == "") {
        interestInput.classList.remove("invalid");
    }
});
//the years input and checks
const yearsInput = document.getElementById("years");
yearsInput.addEventListener("blur", () => {
    if (numberCheck(yearsInput.value)) {
        if (yearCheck(Number(yearsInput.value.replace(",", ".")))) {
            yearsInput.classList.remove("invalid");
            year.amount = Number(yearsInput.value.replace(",", "."));
            year.isSet = true;
        }
        else {
            yearsInput.classList.add("invalid");
            year.isSet = false;
        }
    }
    else {
        yearsInput.classList.add("invalid");
        year.isSet = false;
    }
    if (yearsInput.value == "") {
        yearsInput.classList.remove("invalid");
    }
});
//function section
function monthlyPay(loan, interest, months) {
    return (loan *
        ((interest * (1 + interest) ** months) / ((1 + interest) ** months - 1)));
}
function totalInterest(months, totalPaid, monthPaid) {
    return months * monthPaid - totalPaid;
}
function formatMoney(unformatted) {
    return unformatted.toLocaleString("sv-SE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
function numberCheck(x) {
    return /^[0-9]+([.,][0-9]+)?$/.test(x);
}
function yearCheck(year) {
    if (year <= 50 && year > 0) {
        return true;
    }
    return false;
}
function procentCheck(procentage) {
    if (procentage < 30 && procentage > 0) {
        return true;
    }
    return false;
}
function loanCheck(amount) {
    if (amount > 0.01 && amount < 1000000000) {
        return true;
    }
    return false;
}
function monthlyInterest() {
    return loan.amount * interest.procentage;
}
function startFormat() {
    let monthly = monthlyPay(loan.amount, interest.procentage, year.amount * 12);
    let interestPaid = monthlyInterest();
    let amortering = monthly - interestPaid;
    console.log(amortering);
    console.log(interestPaid);
    console.log(monthly);
}
