const currencyEl__one = document.getElementById("currency-one");
const currencyEl__two = document.getElementById("currency-two");
const amountEl__one = document.getElementById("amount-one");
const amountEl__two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

//Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl__one.value;
  const currency_two = currencyEl__two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl__two.value = (amountEl__one.value * rate).toFixed(2);
    });
}

// Event Listners
currencyEl__one.addEventListener("change", calculate);
amountEl__one.addEventListener("input", calculate);
currencyEl__two.addEventListener("change", calculate);
amountEl__two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  [currencyEl__one.value, currencyEl__two.value] = [
    currencyEl__two.value,
    currencyEl__one.value,
  ];
  calculate();
});

calculate();
