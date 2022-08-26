const helpers = require("./helpers");

function decode(string) {
  const memoryStack = [0];
  let decodedOutput = "";
  let memoryPointer = 0;
  let index = 0;
  
  //This method is capable of deserializing even emojis
  const instructions = Array.from(string);

  const conditions = {
    "👉": () => {
      memoryPointer++;
      memoryStack[memoryPointer] ??= 0;
    },
    "👈": () => {
      memoryPointer--;
      memoryStack[memoryPointer] ??= 0;
    },
    "👆": () =>
      (memoryStack[memoryPointer] = helpers.replaceValue(
        memoryStack[memoryPointer] + 1
      )),
    "👇": () =>
      (memoryStack[memoryPointer] = helpers.replaceValue(
        memoryStack[memoryPointer] - 1
      )),

    "🤜": () => {
      if (memoryStack[memoryPointer] === 0) {
        index = helpers.fistCounterNext(index, instructions);
      }
    },
    "🤛": () => {
      if (memoryStack[memoryPointer] !== 0) {
        index = helpers.fistCounterPrevius(index, instructions);
      }
    },
    "👊": () => {
      decodedOutput += String.fromCharCode(memoryStack[memoryPointer]);
    },
  };

  if(instructions.length){
    while (index < instructions.length) {
      const trigger = instructions[index];
      conditions[trigger]();
      index++;
    }
  
  }

  return decodedOutput;
}

///hello
console.log(decode(
  "👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊"
));

///hello world!
console.log(
  decode(
    "👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊"
  )
);

module.exports = decode;
