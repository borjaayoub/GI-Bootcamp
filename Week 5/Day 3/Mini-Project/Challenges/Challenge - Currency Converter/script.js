const API_Key = "6d89bae42a06e522bd72afee";
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const conversionResult = document.getElementById("conversionResult");
const switchIcon = document.getElementById("switch-icon");


async function getData() {
  await fetch(`https://v6.exchangerate-api.com/v6/${API_Key}/codes`)
    .then(response =>{
      return response.json()
    })
    .then(data=>{
      let currencyList = data.supported_codes;
      
      currencyList.forEach(([code, name]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${code} - ${name}`;
      
        // Add to both selects
        fromCurrency.appendChild(option.cloneNode(true));
        toCurrency.appendChild(option);
      });
    })
  
  document.getElementById("btn").addEventListener('click', convert);
}

async function convert(){
  if (!amount.value || isNaN(amount.value) || amount.value <= 0) {
    conversionResult.textContent = "⚠️ Please enter a valid amount greater than 0.";
    amount.value = '';
    amount.focus()
    return;
  }
  await fetch(`https://v6.exchangerate-api.com/v6/${API_Key}/pair/${fromCurrency.value}/${toCurrency.value}`)
    .then(response =>{
    return response.json();
    })
    .then(conversion =>{
    let convertedAmount = amount.value * conversion.conversion_rate;
    conversionResult.textContent = `${convertedAmount} ${toCurrency.value}`;
    })
    
  amount.focus()
}

getData()

//switch the currencies and display the new amount
function switchCurrency(){
  switchIcon.addEventListener('click', (e)=>{
    e.preventDefault();
    let swtichedCurrency = toCurrency.value;
    toCurrency.value = fromCurrency.value;
    fromCurrency.value = swtichedCurrency;
    convert();
  })
}
switchCurrency()