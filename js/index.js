const displayData = (data) => {
  const values = Object.values(data);
  for(let i = 0; i < values.length; i++) {
    //values[i] = values[i].replace(/,/g, ' ');
    console.log(values[i])
  }
  let html = JSON.stringify(data);
  html = html
  .replace(/,/g,'<br>')
  .replace(/"/g, '')
  .replace(/{/g, '')
  .replace(/}/g, '')
  .replace(/\[/g, '')
  .replace(/]/g, '')
  .replace(/:/g, ':  ')
  .replace(/\\/g, ' ')
  html = '<b>' + html;
  vinDisplay.innerHTML = html;
}

const getData = async (vin) => {
  const dataUrl = `https://auto.dev/api/vin/${vin}?apikey=ZrQEPSkKY29uYmVjZGV2QGdtYWlsLmNvbQ==`;
  const data = (await axios.get(dataUrl)).data
  displayData(data);
}

const displayVinData = async () => {
  const data = await getData(vinInput.value)
}

const vinDisplay = document.querySelector('.vindisplay');
const vinInput = document.querySelector('.vin')
const submit = document.querySelector('.vinbutton');
submit.addEventListener('click', displayVinData)




