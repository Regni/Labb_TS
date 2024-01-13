let loan:{amount:number; isSet:boolean} = {
  amount:100000,
  isSet: false
}

let interest:{procentage:number; isSet:boolean}={
  procentage:3,
  isSet: false
}

let year:{amount:number; isSet:Boolean} ={
  amount:25,
  isSet: false
}

const btn = document.getElementById("calculateBtn") as HTMLButtonElement
btn.addEventListener("click",()=>{

})


const loanInput = document.getElementById("loan") as HTMLInputElement
loanInput.addEventListener("blur",()=>{
  if(numberCheck(loanInput.value)){
    loanInput.classList.remove("invalid")
    console.log(Number(loanInput.value.replace(",",".")))
  }else{
    loanInput.classList.add("invalid")
  }
})

const interestInput = document.getElementById("interest")as HTMLInputElement
interestInput.addEventListener("blur",()=>{
  if(numberCheck(interestInput.value)){
    interestInput.classList.remove("invalid")
    console.log(Number(interestInput.value.replace(",",".")))
  }else{
    interestInput.classList.add("invalid")
  }
})

const yearsInput = document.getElementById("years")as HTMLInputElement
yearsInput.addEventListener("blur",()=>{
  if(numberCheck(yearsInput.value)){
    yearsInput.classList.remove("invalid")
    console.log(Number(yearsInput.value.replace(",",".")))
    year.amount = Number(yearsInput.value.replace(",","."))
    year.isSet=true
    console.log(year)
  }else{
    yearsInput.classList.add("invalid")
  }
})


function amount(p:number,r:number,n:number):void{
let monthlyPay:number = p * ((r*(1+r)**n)/((1+r)**n-1))
const paidInterest = totalInterest(n,p,monthlyPay)
const outputDiv = document.getElementById("output") as HTMLDivElement
  const newP = document.createElement("p")
  newP.innerHTML=`You have to pay ${formatMoney(monthlyPay)} per month and the what you paid in interest is ${formatMoney(paidInterest)} so the total is ${formatMoney((paidInterest + p))}`
  console.log(`${monthlyPay} and months left ${n} your total is ${p}`)
  outputDiv.appendChild(newP)


}

function monthlyPay(loan:number, interest:number, months:number):number{
  return loan * ((interest*(1+interest)**months)/((1+interest)**months-1))
}

function totalInterest(months:number,totalPaid:number,monthPaid:number):number{
  return months*monthPaid-totalPaid
}

function formatMoney(unformatted:number):string{
  return unformatted.toLocaleString("sv-SE",{minimumFractionDigits:2, maximumFractionDigits: 2})
}

function numberCheck(x:any):boolean{
return /^[0-9]+([.,][0-9]+)?$/.test(x)
}






