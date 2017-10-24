"use strict"

function countZero(i) {
  var t = '';
  for (var k = 0 ; k < i; k++)  {
    t += '0';
  }
  return t;
}

function compareNumber(a,b){
  for (var i = a.length-1; i >= 0; i--){
    if (a[i] > b[i])
      return 0;
    if (b[i] > a[i])
    return 1;
  }
  return 2;
}

function maxLenght(a,b){
  var len = [];
  if (a.length > b.length){
    len[0] = a.length; len[1] = 0;
    return len;
  }
  if (a.length == b.length)
  {
    len[0] = a.length; len[1] = 2;
    return len;
  }
  len[0] = b.length; len[1] = 1;
  return len;
}

function add(a,b) {
  var result = [], len = 0;
  len = maxLenght(a,b)[0];
  for (var i = 0, d = 0, c = 0; i < len; i++) {
    if (isNaN(a[i]) == true){
      a[i]=0;
    }
    if (isNaN(b[i]) == true){
      b[i]=0;
    }
    a[i] = +a[i];
    b[i] = +b[i];
    d = a[i] + (b[i] || 0) + c;

    if (d > 9){
      c = 1;
      result[i] = d - 10;
      d = 0;
      if (i == len-1){
        result[i+1] = c;
      }
    }
    else {
      c = 0;
      result[i] = d;
      d = 0;
    }
  }
  return result;
}

function minus(a,b) {
  var len = maxLenght(a,b),
  result = [];
  if (len[1] == 0){
    for (var i = 0, d = 0, c = 0; i < len[0]; i++) {
      d = a[i] - (b[i] || 0) + c;
      result[i] = d < 0 ? (c = -1, 10 + d) : (c = 0, d)
    }
    return result.reverse().join('').replace(/^0+/, '');
    }
  if (len[1] == 1) {
    var tmp = a;
    a = b;
    b = tmp;
    for (var i = 0, d = 0, c = 0; i < len[0]; i++) {
      d = a[i] - (b[i] || 0) + c;
      result[i] = d < 0 ? (c = -1, 10 + d) : (c = 0, d)
    }
    return result.reverse().join('').replace(/^0+/, '');
  }
  if (len[1] == 2){
    switch (compareNumber(a,b)) {
      case 0: {
        for (var i = 0, d = 0, c = 0; i < len[0]; i++) {
          d = a[i] - (b[i] || 0) + c;
          result[i] = d < 0 ? (c = -1, 10 + d) : (c = 0, d)
        }
        return result.reverse().join('').replace(/^0+/, '');
        break;
      }
      case 1: {
        var tmp = a;
        a = b;
        b = tmp;
        for (var i = 0, d = 0, c = 0; i < len[0]; i++) {
          d = a[i] - (b[i] || 0) + c;
          result[i] = d < 0 ? (c = -1, 10 + d) : (c = 0, d)
        }
        return result.reverse().join('').replace(/^0+/, '');
        break;
      }
      case 2: {
        return 0;
        break;
      }
    }
  }
  return result.reverse().join('').replace(/^0+/, '');
}

function multiply(a,b) {
  var result = [], tmp = '', curtmp = [], curSum= '',c = 0;
  if ((a.length == 1) && (b.length == 1))
      return a[i]*b[i];
  for (var i = 0, d = 0; i < b.length; i++) {
    for (var j = 0; j < a.length; j++ ){
      a[j] = +a[j];
      b[i]= +b[i];
      d = b[i] * a[j] + c;
      if (d > 9){
        c = Math.trunc(d/10);
        d = d % 10;
        tmp += d;
      }
      else {
        c = 0;
        tmp += d;
      }
      if ((c != 0) && (j == a.length-1)){
        tmp += c;
        c = 0;
      }
    }
    curtmp[i] = (countZero(i).toString() + tmp);
    tmp = '';
  }
  curSum = curtmp[0];
  if (curtmp.length == 1){
    curSum = curtmp[0].split('').reverse().join('').replace(/^0+/, '');
  }
  for (var i = 1; i < curtmp.length; i++){
    curSum = add(curSum.split(''),curtmp[i].split('')).reverse().join('');
    if ((curtmp.length > 2) && (i != curtmp.length - 1)){
      curSum =curSum.split('').reverse().join('');
    }
  }
  return curSum;
}
function calculate() {

    var a = document.getElementById('firstNumber').value;
    var b = document.getElementById('secondNumber').value;

    var sel = document.getElementById("operSelect");
    var sign = sel.options[sel.selectedIndex].value;

    if (isNaN(a)==true) a=0;
    if (isNaN(b)==true) b=0;

    if (sign === "+"){
        a = a.split('').reverse();
        b = b.split('').reverse();
        var bool = false;
        if ((a[a.length-1] == "-") && (b[b.length-1] == "-")){
            a.pop();
            b.pop();
            var r = '-' + add(a,b).reverse().join('').replace(/^0+/, '');
            bool = true;
        }
        if ((a[a.length-1] == "-") && (b[b.length-1] != "-")){
          a.pop();
          var compInd = compareNumber(a,b);
          var ind = maxLenght(a,b)[1];
          if(ind == 0) {
            var r = "-" + minus(a,b);
            bool = true;
          }
          if (ind == 1){
            var r = minus(b,a);
            bool = true;
            }
          if (ind == 2){
            if (compInd == 2){
              var r = "0";
              bool = true;
            }
            if (compInd == 1){
              var r = minus(b,a);
              bool = true;
            }
            if (compInd == 0){
              var r = "-" + minus(a,b);
              bool = true;
            }
          }
        }
      }
        if ((a[a.length-1] != "-") && (b[b.length-1] == "-")){
          b.pop();
          var compInd = compareNumber(a,b);
          var ind = maxLenght(a,b)[1];
          if (ind == 0) {
            var r = minus(a,b);
            bool = true;
          }
          if (ind == 1){
            var r = "-" + minus(b,a);
            bool = true;
            }
          if (ind == 2){
            if (compInd == 2){
              var r = 0;
              bool = true;
            }
            if (compInd == 1){
              var r ="-" + minus(b,a);
              bool = true;
            }
            if (compInd == 0){
              var r = minus(a,b);
              bool = true;
            }
          }
        }
        if (bool == false){
          var r = add(a,b).reverse().join('').replace(/^0+/, '');
      }


    if (sign === "-"){
      a = a.split('').reverse();
      b = b.split('').reverse();
      var bool = false;
      var ind = maxLenght(a,b)[1];

      if ((a[a.length-1] == "-") && (b[b.length-1] == "-")){
        a.pop();
        b.pop();
        if (ind == 0){
          var r = '-' + minus(a,b);
          bool = true;
        }
        if (ind == 1) {
          var r = minus(b,a);
          bool = true;
        }
        if (ind == 2){
          if (compareNumber(a,b) == 0){
            var r = '-' + minus(a,b);
            bool = true;
          }
          if (compareNumber(a,b) == 1){
            var r =  minus(b,a);
            bool = true;
          }
          if (compareNumber(a,b) == 2){
            var r = "-" + add(a,a).reverse().join('').replace(/^0+/, '');
            bool = true;
          }
        }
      }
      if ((a[a.length-1] == "-") && (b[b.length-1] != "-")){
        a.pop();
        var r = "-" + add(a,b).reverse().join('').replace(/^0+/, '');
        bool = true;
      }
      if ((a[a.length-1] != "-") && (b[b.length-1] == "-")){
        b.pop();
          var r = add(a,b).reverse().join('').replace(/^0+/, '');
          bool = true;
      }
      if (bool == false){

        var t = compareNumber(a,b), l = maxLenght(a,b)[1];
        if ((l == 0) || ((l == 2) && (t == 0))) {
            var r = minus(a,b);
        }
        if ((l == 1) || ((l == 2) && (t == 1))) {
          var r = "-" + minus(b,a);
        }
        if ((l == 2) && (t == 2)){
            var r = 0;
          }
        }
    }

    if (sign === "*"){
      var bool = false;
      if ((a == '0') || (b == '0')){
        var r = 0;
      }
      else {
      a = a.split('').reverse();
      b = b.split('').reverse();

      if ((a[a.length-1] == '-') && (b[b.length-1] != '-')){
        a.pop();
        var r = "-" + multiply(a,b);
        bool = true;
      }
      if ((a[a.length-1] != '-') && (b[b.length-1] == '-')){
        b.pop();
        var r = "-" + multiply(a,b);
        bool = true;
      }

      if ((a[a.length-1] == '-') && (b[b.length-1] == '-')){
        a.pop();
        b.pop();
        var r =  multiply(a,b);
        bool = true;
      }
      if (bool == false){
        var r =  multiply(a,b);
      }
      }
    }

    if (sign === "/"){

    }

    document.getElementById('result').value = r;
  }
