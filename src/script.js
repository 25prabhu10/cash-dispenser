const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

const updateCount = (e) => {
  const form = document.getElementById("atm-form");
  const inputAmount = document.getElementById("amount");
  const noteCount = document.getElementById("dispensed-amount");

  let dispatch = parseInt(inputAmount.value, 10);

  // IF VALUE IS 0 OR EMPTY THEN DON'T PROCEED
  if (isNaN(dispatch) || dispatch <= 0 || dispatch > 999999999999999999) {
    return;
  }

  const denominations = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
  const names = [
    "thousand",
    "five-hundred",
    "two-hundred",
    "one-hundred",
    "fifty",
    "twenty",
    "ten",
    "five",
    "two",
    "one",
  ];

  let total = 0;

  noteCount.textContent = `Note Count for Amount ${currencyFormatter.format(
    dispatch,
  )}`;

  for (let counter = 0; counter < names.length; counter++) {
    let count = 0;
    const element = document.getElementById(names[counter]);

    element.parentElement.classList.remove("bg-wheat");

    count = Math.floor(dispatch / denominations[counter]);
    element.textContent = count;

    if (count !== 0) {
      element.parentElement.classList.add("bg-wheat");
    }

    dispatch = dispatch % denominations[counter];
    total = total + count;
  }

  document.getElementById("total").textContent = total;
  noteCount.scrollIntoView();
};

window.addEventListener("load", () => {
  const form = document.getElementById("atm-form");
  const inputAmount = document.getElementById("amount");

  const urlParams = new URLSearchParams(window.location.search);
  const amountParam = urlParams.get("amount");

  if (amountParam) {
    if (isNaN(parseInt(amountParam, 10))) {
      return;
    }

    inputAmount.value = amountParam;
    updateCount();
  }

  // submit form
  form.addEventListener("submit", updateCount);
});
