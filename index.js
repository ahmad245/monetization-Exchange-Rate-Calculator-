// M.AutoInit();
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  });
  const fetchDataFromApi = async (search) => {
    const response = await axios.get(` https://prime.exchangerate-api.com/v5/a994a41520566946f3814f82/latest/${search}`)
   return response;
     
}

  const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


const caclulate=async()=>{
    let response= await fetchDataFromApi(currencyEl_one.value);
    let rate=response.data.conversion_rates[currencyEl_two.value]
    rateEl.innerText=`1 ${currencyEl_one.value} = ${rate} ${currencyEl_two.value}`;

    amountEl_two.value=(amountEl_one.value * rate).toFixed(2);
    
}

currencyEl_one.addEventListener('change', caclulate);
amountEl_one.addEventListener('input', caclulate);
currencyEl_two.addEventListener('change', caclulate);
amountEl_two.addEventListener('input', caclulate);


swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caclulate();
});

caclulate();