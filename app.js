const Base_Url = "http://data.fixer.io/api/latest?access_key=7370ff2962d49abefc56c32f5bc74aa8";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdown){
for (currcode in countryList){
let newOption=document.createElement("option");
newOption.innerText=currcode;
newOption.value=currcode;
select.append(newOption);
if(select.name==="from" && currcode==="USD"){
newOption.selected="selected";
}
else if(select.name==="to" && currcode==="INR"){
newOption.selected="selected";
}
}

select.addEventListener("change",(evt)=>{
updateflag(evt.target);
});
}
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtValue = (amount.value);
  if (amtValue==="" || amtValue < 1) {
    amtValue = 1;
    amount.value = "1";
   }

  // Free Fixer plan only allows base EUR
  const URL = `${Base_Url}&symbols=${fromCurr.value},${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rates = data.rates;
    let fromRate = rates[fromCurr.value];
    let toRate = rates[toCurr.value];
    // Convert via EUR
    let finalAmount = (amtValue / fromRate) * toRate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    console.log(data);
 
  };

const updateflag=(element)=>{
let currcode= element.value;
let countrycode=countryList[currcode];
let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
let image=element.parentElement.querySelector("img");
image.src=newsrc;
};
//
btn.addEventListener("click",async(evt)=>{
evt.preventDefault();
updateExchangeRate();
});

window.addEventListener("load",()=>{
updateExchangeRate();
});