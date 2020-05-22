function radioCheck() {
    if (document.getElementById('imperial').checked) {
        document.getElementById('form_Imperial').style.display = 'block';
    }
    else {
        document.getElementById('form_Imperial').style.display = 'none';
    }
    if (document.getElementById('metric').checked) {
      document.getElementById('form_metric').style.display = 'block';
    }
    else {
      document.getElementById('form_metric').style.display = 'none';
    }
}

var weight_kg
var height_cm
var test2

function readinput1() {
  weight_kg = document.getElementById('weight_kg').value
}

function readinput2() {
  height_cm = document.getElementById('height_cm').value

  var height = height_cm * height_cm
  var bmiNum = (weight_kg/height)*10000
  var bmi = bmiNum.toFixed(2)

  var spantag = document.createElement('span');
  spantag.textContent = bmi;
  spantag.setAttribute('class', 'note');
  var test2 = document.body.appendChild(spantag);
  
  console.log(test2)
  document.getElementById("wrapper").innerHTML = test2
}

