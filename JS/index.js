"use strict";
let loan = 1000000;
let year = 0.0025;
let interest = 300;
function amount(p, r, n) {
    let monthlyPay = p * ((r * (1 + r) ** n) / ((1 + r) ** n - 1));
    const paidInterest = totalInterest(n, p, monthlyPay);
    const outputDiv = document.getElementById("output");
    const newP = document.createElement("p");
    newP.innerHTML = `You have to pay ${formatMoney(monthlyPay)} per month and the what you paid in interest is ${formatMoney(paidInterest)} so the total is ${formatMoney((paidInterest + p))}`;
    console.log(`${monthlyPay} and months left ${n} your total is ${p}`);
    outputDiv.appendChild(newP);
}
function monthlyPay(loan, interest, months) {
    return loan * ((interest * (1 + interest) ** months) / ((1 + interest) ** months - 1));
}
function totalInterest(months, totalPaid, monthPaid) {
    return months * monthPaid - totalPaid;
}
function formatMoney(unformatted) {
    return unformatted.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
const loanInput = document.getElementById("loan");
loanInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        let test = Number(loanInput.value);
        console.log(test);
        //write test logic here
    }
});
let test = Number(loanInput.value);
console.log(test);
console.log(monthlyPay(loan, year, interest));
