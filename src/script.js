window.addEventListener('load', () => {
  const dispatchBtn = document.getElementById('dispatch-btn');
  const inputAmount = document.getElementById('amount');

  const updateCount = () => {
    let dispatch = parseInt(inputAmount.value);

    // IF VALUE IS 0 OR EMPTY THEN DON't PROCEED
    if (dispatch === 0 || isNaN(dispatch)) {
      return;
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
    document.getElementById('note-count').scrollIntoView();
    inputAmount.value = '';
  };

  dispatchBtn.addEventListener('click', updateCount);
  window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') updateCount();
  });
});
