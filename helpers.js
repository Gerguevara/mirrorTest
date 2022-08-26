const helpers = {

  replaceValue: (value) => {
    if (value > 255) {
      return 0;
    }
    if (value < 0) {
      return 255;
    }
    return value;
  },

  fistCounterNext: (index, values) => {
    let fists = 1;
    for (let i = index + 1; i < values.length; i++) {
      if (values[i] === "🤜") fists++;
      if (values[i] === "🤛") fists--;
      if (fists === 0) return i;
    }
  },

  fistCounterPrevius: (index, values) => {
    let fists = 1;
    for (let i = index - 1; i >= 0; i--) {
      if (values[i] === "🤛") fists++;
      if (values[i] === "🤜") fists--;
      if (fists === 0) return i;
    }
  },
};

module.exports = helpers;
