console.log('test JS and vsCode')

function display(value) {
  console.log(value)
}

display(45)

function isFirstNumBigger(num1, num2) {
  if (num1 > num2) {
    return console.log('first number is bigger')
  }
  if (num1 == num2) {
    return console.log('numbers are equels')
  } else {
    return console.log('second number is bigger')
  }
}

isFirstNumBigger(24, 24)

isFirstNumBigger(24, 25)
