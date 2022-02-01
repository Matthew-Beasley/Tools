const displayData = (data) => {
  let html = `<ul id="datalist">`;
  //const usedHeadings = new Set;
  const entries = Object.entries(data);
  //console.log(entries)
  for (let i = 0; i < entries.length; i++) {
    const key = entries[i][0];
    const value = entries[i][1];
    if (typeof(value) === 'string') {
      html += `<li class="toplist">${key}: ${value}</li>`;
    } else  if (typeof(value) === 'object') {
      const secondEntries = Object.entries(value);
      html += `<li class="toplist">${key}</li>`;
      for (let k = 0; k < secondEntries.length; k++) {
        const secondKey = secondEntries[k][0];
        const secondValue =secondEntries[k][1];
        if (typeof(secondValue) === 'string' && secondKey !== 'id' && secondKey !== 'niceName') {
          html += `<li class=secondarylist>${secondKey}: ${secondValue}</li>`;
        } else if (secondValue === 'options') {
          html += `,li class="secondarylist">${secondKey}</li>`;
        } else if (typeof(secondValue) === 'object') {
          const thirdEntries = Object.entries(secondValue);
          //html += `<li class="thirdlist">${secondKey}</li>`;
          for (let j = 0; j < thirdEntries.length; j++) {
            const thirdKey = thirdEntries[j][0];
            const thirdValue = thirdEntries[j][1];
            if (typeof(thirdValue) === 'string') {
              html += `<li class="fourthlist">${thirdKey} ${thirdValue}</li>`;
            } else if (typeof(thirdValue) === 'object'){
              const fourthEntries = Object.entries(thirdValue);
              for (let l = 0; l < fourthEntries.length; l++) {
                const fourthKey = fourthEntries[l][0];
                const fourthValue = fourthEntries[l][1];
                //html += `<li class="fifthlist">${fourthKey}</li>`;
                const fifthEntries = Object.entries(fourthValue);
                for (let m = 0; m < fifthEntries.length; m++) {
                  const fifthKey = fifthEntries[m][0];
                  const fifthValue = fifthEntries[m][1];
                  if (typeof(fifthValue) !== 'object' && fifthKey !== 'id') {
                    html += `<li class="sixthlist">${fifthKey} ${fifthValue}</li>`;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  html += '</ul>'
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




