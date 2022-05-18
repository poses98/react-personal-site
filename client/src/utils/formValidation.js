/**
 * Min length validation for input data
 * @param {*} inputData
 * @param {int} minLength
 */
export function minLengthValidation(inputData, minLength) {
  const { value } = inputData;

  removeClassErrorSuccess(inputData);

  if (value.length >= minLength) {
    inputData.classList.add('success');
    return true;
  } else {
    inputData.classList.add('error');
    return false;
  }
}

export function emailValidation(inputData) {
  const emailRegex =
    // eslint-disable-next-line no-useless-escape
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const { value } = inputData;

  removeClassErrorSuccess(inputData);

  const resultValidation = emailRegex.test(value);

  if (resultValidation) {
    inputData.classList.add('success');
  } else {
    inputData.classList.add('error');
  }
}

function removeClassErrorSuccess(inputData) {
  inputData.classList.remove('success');
  inputData.classList.remove('error');
}
