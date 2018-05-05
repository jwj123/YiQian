const emailRegex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.([a-zA-Z0-9_-])+$/;

function validateEmail(email) {
  return emailRegex.test(email);
}

export default { validateEmail };
