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

  var height = height_cm * height_cm
  var bmiNum = (weight_kg/height)*10000
  var bmi = bmiNum.toFixed(2)
  
  document.getElementById("weightcat1").style.background = "none"
  document.getElementById("weightcat2").style.background = "none"
  document.getElementById("weightcat3").style.background = "none"
  document.getElementById("weightcat4").style.background = "none"
  document.getElementById("weightcat5").style.background = "none"
  document.getElementById("weightcat6").style.background = "none"
  document.getElementById("weightcat7").style.background = "none"
  document.getElementById("weightcat8").style.background = "none"

  if (bmi){
    if((bmi <= 25) && (bmi >= 18.5)) {
    document.getElementById('title').style.backgroundColor = "#5cb85c"
    document.getElementById('title').innerHTML = 'normal'
    document.getElementById("weightcat4").style.background = "#5cb85c"
  } else if((bmi < 18.5) && (bmi > 0)) {
    document.getElementById('title').style.backgroundColor = "#DC143C"
    document.getElementById('title').innerHTML = 'Underweight'
      if(bmi <= 16){
        document.getElementById("weightcat1").style.background = "#DC143C"
      } else if (bmi > 16 && bmi < 17) {
        document.getElementById("weightcat2").style.background = "#FF4500"
      } else 
        document.getElementById("weightcat3").style.background = "#FF6347"
  } else if(bmi > 25) {
    document.getElementById('title').style.backgroundColor = "#DC143C"
    document.getElementById('title').innerHTML = 'Overweight'
      if(bmi > 25 && bmi <= 30){
        document.getElementById("weightcat5").style.background = "#FF6347"
      } else if (bmi > 30 && bmi <= 35) {
        document.getElementById("weightcat6").style.background = "#FF4500"
      } else if (bmi > 35 && bmi <= 40) {
        document.getElementById("weightcat7").style.background = "#FF0000"
      } else
        document.getElementById("weightcat8").style.background = "#DC143C"
  } else {
    bmi = '00.00'
    document.getElementById('title').style.backgroundColor = "#864e05"
    document.getElementById('title').innerHTML = 'Unknown'
  } } else {
    bmi = '00.00'
    document.getElementById('title').style.backgroundColor = "#864e05"
    document.getElementById('title').innerHTML = 'Unknown'
  }

  document.getElementById('bmiOut').innerHTML = bmi
}

function SetDefaultValue(){
  document.getElementById('title').style.backgroundColor = "#864e05"
  document.getElementById('title').innerHTML = 'Unknown'
  document.getElementById('bmiOut').innerHTML = '00.00'
}