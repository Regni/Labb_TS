"use strict";
let loan = 1000000;
let year = 0.0025;
let interest = 300;
function amount(p, r, n) {
    let total = p * ((r * (1 + r) ** n) / ((1 + r) ** n - 1));
    return total;
}
console.log(amount(loan, year, interest));
