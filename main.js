//slider update code
const sliderEl = document.getElementById("chars");
const sliderValue = document.querySelector(".value");
const numOfChars = document.getElementById("chars-num");
const generate = document.getAnimations("generate");
const form = document.getElementById("form");
const gen = document.getElementById("gen");
const meter = document.getElementById("meter");
const str = document.getElementsByClassName("str");
const copied = document.getElementById("copied");
  let numberOfParams = 0;
let resulted;

sliderEl.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value;
  numOfChars.innerText = tempSliderValue; 
  
  
  const progress = (tempSliderValue / sliderEl.max) * 100;
 
  sliderEl.style.background = `linear-gradient(to right, #A4FFAF ${progress}%, #18171F ${progress}%)`;
})

const charsNum = document.getElementById("chars-num");

function handlesubmit(e){
      numberOfParams = 0;
    e.preventDefault();


      const data = {};
  const fields = e.target.querySelectorAll("input, select, textarea");
  
  for (const field of fields) {
  if (field.type === "checkbox") {
    data[field.name] = field.checked;
    if(field.checked){
      numberOfParams = numberOfParams + 1;
      
    }
  } else {
    data[field.name] = field.value;
  }

  }
  console.log(numberOfParams);
  generatePass(data["chars"],data["lowercase"],data["uppercase"],data["numbers"],data["symbols"]);
  checkStrength(data["chars"],numberOfParams);

}

function generatePass(length,includeLower,includeUpper,includeNumbers,includeSymbols){
  let result = '';
  let characters = '';
  if(includeLower) characters +='abcdefgjhjklmnopqrstuvwxyz';
  if(includeUpper) characters+='ABCDEFQHIJKLMNOPQRSTUVWXYZ';
  if(includeNumbers) characters +='1234567890';
  if(includeSymbols) characters += '!@#$%^&*()_+.[]';

   if(characters.length === 0) return '';

  for(let i=0; i <length; i++){
    const randomIndex = Math.floor(Math.random() * characters.length);
    result +=characters[randomIndex];
  }
  gen.textContent = result;
  gen.classList.add("generate-pass");
  resulted = result;
  
}


function checkStrength(length,numberOfParams){
  console.log('checking');
  for (const strCell of str){
    strCell.style.background = '';
    strCell.style.borderColor = 'white';
  }


  // here we set the color per number of parameters
  let color;
  if (numberOfParams == 1){
    color = 'var(--red500)';
  } else if (numberOfParams == 2){
    color = 'var(--orange400)';
  }else if (numberOfParams == 3){
    color = 'var(--yellow300)';
  }
  else if (numberOfParams == 4){
    color = 'var(--green200)';
  }



    //this loop colors as many cells as we need
  for (i=0; i<numberOfParams; i++){
    str[i].style.background = color;
    str[i].style.borderColor = color;


  }
}
function copy() {
  console.log('copied!!');
  copied.textContent = "COPIED";
  navigator.clipboard.writeText(resulted)
    .then(() => console.log('Text copied!'))
    .catch(err => {
      console.error('Failed to copy:', err);
      copied.textContent = "COPY FAILED";
    });
}



form.addEventListener('submit',handlesubmit);

