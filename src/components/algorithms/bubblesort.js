export const bubbleSort = (inputArr, renderDelay) => {
  let array = [...inputArr];
  let frames = [];
  let len = inputArr.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (array[j + 1] && array[j].value > array[j + 1].value) {
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;

        frames.push({
          toCompare: [j, j + 1],
          afterChange: [...array],
        });
      }
    }
  }

  renderDelay(frames, 10);
};
