var weight_kg
var height_cm
var test1 
var test2

calculateBMI()


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


function readinput1() {
  weight_kg = document.getElementById('weight_kg').value
}

function readinput2() {
  height_cm = document.getElementById('height_cm').value
  calculateBMI()
}

function calculateBMI(){
  var height = height_cm * height_cm
  var bmiNum = (weight_kg/height)*10000
  var bmi = bmiNum.toFixed(2)
  if (bmi){
    if((bmi <= 24) && (bmi >= 19)) {
    var class_var = 'success'
    var title = 'normal'
  } else if((bmi < 19) && (bmi > 0)) {
    var class_var = 'danger'
    var title = 'Underweight'
  } else if(bmi > 24) {
    var class_var = 'danger'
    var title = 'Overweight'
  } else {
    var class_var = 'default'
    var title = 'Unknown'
    console.log('first loop')
    bmi = '00.00'
  } } else {
    var class_var = 'default'
    var title = 'Unknown'
    bmi = '00.00'
    console.log('first loop 1')
  }

  /* BMI tag with value */
  var bmi_spantag = document.createElement('div')
  bmi_spantag.textContent = bmi
  bmi_spantag.setAttribute('class', 'w-50 text-center label-' +class_var)
  var test1 = document.body.appendChild(bmi_spantag)
  
  /* title tag with title */
  var title_spantag = document.createElement('div')
  title_spantag.textContent = title
  title_spantag.setAttribute('class', 'w-50 text-center text-muted')
  var test2 = document.body.appendChild(title_spantag)

  console.log(test1)
  console.log(test2)
  document.getElementById("id01-1").innerHTML = test1

  console.log(test2)
  document.getElementById("id02-2").innerHTML = test2
}