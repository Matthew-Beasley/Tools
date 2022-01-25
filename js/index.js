

const displayVIN = () => {
  console.log('displayVIN fired')
  //e.preventDefault()
  //console.log('vin input', vinInput.value)
  //vinDisplay.innerHTML = vinInput.value;
  console.log('textbox value ', vinInput.value)
  vinDisplay.innerHTML = vinInput.value;
  //vinDisplay.innerHTML = vinInput.nodeName;
}

function fire () {
  console.log('fire fired')
  vinDisplay.innerHTML = vinInput.value

}
const vinDisplay = document.querySelector('.vindisplay');
console.log('vinDisplay ', vinDisplay)
const vinInput = document.querySelector('.vin');
console.log('vinInput ', vinInput)
const submit = document.querySelector('.vinbutton');
console.log('button ', submit)

submit.addEventListener('click', displayVIN)
vinInput.addEventListener('keypress', fire)



