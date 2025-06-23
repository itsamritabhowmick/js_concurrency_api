const inpSelect = document.querySelector("#in-countries"); // Dropdown (select box) for "from" currency
const outSelect = document.querySelector("#out-countries"); // Dropdown for "to" currency
const inpField = document.querySelector("#in-amount"); // Input box to enter amount
const outField = document.querySelector("#out-amount"); // Output box to show converted amount
const submitBtn = document.querySelector(`button[type="submit"]`); // Button to convert currency
console.log(inpSelect);
console.log(outSelect);

let inpval = undefined;

async function currencyConverter() {
  const url = `https://v6.exchangerate-api.com/v6/77212b693c5cf652af9ff935/latest/USD`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    for (const key in data.conversion_rates) {
      const optionElemInp = document.createElement("option");
      const optionElemOut = document.createElement("option");

      optionElemInp.innerHTML = key;
      optionElemOut.value = key;

      optionElemOut.innerHTML = key;
      optionElemOut.value = key;

      inpSelect.appendChild(optionElemInp);
      outSelect.appendChild(optionElemOut);
    }
  } catch (err) {
    console.log(`Error occured while fetching${err}`);
  }
}

async function convertCurrency(from, to, amount) {
  const url = `https://v6.exchangerate-api.com/v6/77212b693c5cf652af9ff935/latest/${from}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const toValue = data.conversion_rates[to];
    let res = toValue * amount;
    outField.value = res.toFixed(2);
  } catch {
    console.log(`Error occured while fetching${err}`);
  }
}

currencyConverter();

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inpSelectval = inpSelect.value;
  const outSelectVal = outSelect.value;
  inpval = inpField.value;
  inpval = Number(inpval);

  if (
    inpSelectval === "Select country" ||
    outSelectVal === "Select country" ||
    isNaN(inpval) ||
    inpval <= 0
  ) {
    alert("Please select valid currencies and enter a valid amount.");
    return;
  }
  convertCurrency(inpSelectval, outSelectVal, inpval);

  console.log(inpval);
});
