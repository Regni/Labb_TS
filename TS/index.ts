let loan:number = 1000000
let year:number = 0.0025
let interest:number = 300

function amount(p:number,r:number,n:number):number{
let total:number = p * ((r*(1+r)**n)/((1+r)**n-1))

return total
}

console.log(amount(loan,year,interest))