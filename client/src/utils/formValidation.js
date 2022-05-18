/**
 * Min length validation for input data
 * @param {*} inputData
 * @param {int} minLength
 */
export function minLengthValidation(inputData, minLength) {
  const { value } = inputData;

  removeClassErrorSuccess(inputData);

  if (value.length >= minLength) {
    inputData.parent.classList.add('success');
    return true;
  } else {
    inputData.parent.classList.add('error');
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
    inputData.parent.classList.add('success');
  } else {
    inputData.parent.classList.add('error');
  }
}

function removeClassErrorSuccess(inputData) {
  inputData.parent.classList.remove('success');
  inputData.parent.classList.remove('error');
}
