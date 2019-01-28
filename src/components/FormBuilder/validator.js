const validator = (validation, isRequired, value) => {
  if (!validation) {
    return true;
  }

  if (isRequired && !value) {
    return false;
  }

  const types = {
    int: /^[0-9]*$/,
    float: /[-+]?[0-9]*\.?[0-9]+/,
    url: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/,
    string: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
    noSpecial: /^[a-zA-Z0-9\s]*$/,
    alpha: /^[a-zA-Z]*$/,
    alphanumeric: /^[a-zA-Z0-9]*$/,
    email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  };

  const regex = validation.type ? types[validation.type] : validation.regex;

  return regex.test(value);
};

export default validator;
