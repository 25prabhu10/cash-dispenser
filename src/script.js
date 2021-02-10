const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

window.addEventListener('load', () => {
  const dispatchBtn = document.getElementById('dispatch-btn');
  const inputAmount = document.getElementById('amount');
  const noteCount = document.getElementById('note-count');
  const errMsg = document.getElementById('err-msg');

  const updateCount = () => {
    let dispatch = parseInt(inputAmount.value, 10);

    // IF VALUE IS 0 OR EMPTY THEN DON't PROCEED
    errMsg.classList.remove('hide');
    errMsg.classList.add('danger');
    if (isNaN(dispatch)) {
      errMsg.textContent = 'Please only numbers';
      return;
    } else if (dispatch <= 0 || dispatch > 999999999999999999) {
      errMsg.textContent =
        'Please enter amount between 1 to 999999999999999999';
      return;
    } else {
      errMsg.classList.remove('danger');
      errMsg.classList.add('hide');
    }

    const denominations = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
    const names = [
      'thousand',
      'five-hundred',
      'two-hundred',
      'one-hundred',
      'fifty',
      'twenty',
      'ten',
      'five',
      'two',
      'one',
    ];

    let total = 0;

    noteCount.textContent = `Note Count for Amount ${currencyFormatter.format(
      dispatch
    )}`;

    for (let counter = 0; counter < names.length; counter++) {
      let count = 0;
      const element = document.getElementById(names[counter]);

      element.parentElement.classList.remove('bg-wheat');

      count = Math.floor(dispatch / denominations[counter]);
      element.textContent = count;

      if (count !== 0) {
        element.parentElement.classList.add('bg-wheat');
      }

      dispatch = dispatch % denominations[counter];
      total = total + count;
    }

    document.getElementById('total').textContent = total;
    noteCount.scrollIntoView();
    inputAmount.value = '';
  };

  dispatchBtn.addEventListener('click', updateCount);
  window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') updateCount();
  });
});
