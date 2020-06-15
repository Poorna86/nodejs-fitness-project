window.onload = SetDefaultValue();

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

function showTableData(){
  var weight_kg = document.getElementById('weight_kg').value
  var height_cm = document.getElementById('height_cm').value
  calculateBMI(weight_kg, height_cm)
}

function calculateBMI(weight_kg, height_cm){
  console.log(height_cm)
  console.log(weight_kg)
  var height = height_cm * height_cm
  var bmiNum = (weight_kg/height)*10000
  var bmi = bmiNum.toFixed(2)
  console.log(bmi)
  if (bmi){
    if((bmi <= 24) && (bmi >= 19)) {
    document.getElementById('title').style.backgroundColor = "#5cb85c"
    document.getElementById('title').innerHTML = 'normal'
    var title = 'normal'
  } else if((bmi < 19) && (bmi > 0)) {
    var class_var = 'danger'
    var title = 'Underweight'
  } else if(bmi > 24) {
    var class_var = 'danger'
    var title = 'Overweight'
  } else {
    bmi = '00.00'
    console.log('first loop')
    document.getElementById('title').style.backgroundColor = "#864e05"
    document.getElementById('title').innerHTML = 'Unknown'
  } } else {
    bmi = '00.00'
    console.log('first loop 1')
    document.getElementById('title').style.backgroundColor = "#864e05"
    document.getElementById('title').innerHTML = 'Unknown'
  }

  document.getElementById('bmiOut').innerHTML = bmi

  /* BMI tag with value 
  var bmi_spantag = document.createElement('div')
  bmi_spantag.textContent = bmi
  bmi_spantag.setAttribute('class', 'w-50 text-center label-' +class_var)
  var test1 = document.body.appendChild(bmi_spantag)
  
  /* title tag with title      var title_spantag = document.createElement('div')
  title_spantag.textContent = title
  title_spantag.setAttribute('class', 'w-50 text-center text-muted')
  var test2 = document.body.appendChild(title_spantag)

  console.log(test1)
  console.log(test2)
  document.getElementById("id01-1").innerHTML = test1 

  console.log(test2)
  document.getElementById("id02-2").innerHTML = test2 */
}

function SetDefaultValue(){
  document.getElementById('title').style.backgroundColor = "#864e05"
  document.getElementById('title').innerHTML = 'Unknown'
  document.getElementById('bmiOut').innerHTML = '00.00'
}