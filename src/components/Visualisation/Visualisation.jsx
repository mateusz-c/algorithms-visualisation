import React, { useState, useEffect } from 'react';
import './Visualisation.scss';
import classNames from 'classnames';
import { bubbleSort } from '../algorithms/bubblesort';
import { algorithms } from '../utils/consts';
import { quickSort } from '../algorithms/quicksort';

const Visualisation = () => {
  const [generatedArray, setGeneratedArray] = useState([]);
  const [comparedPair, setComparedPair] = useState([]);
  const [algorithm, setAlgorithm] = useState(algorithms.BUBBLE_SORT)
  const [isAborted, setAborted] = useState(false);

  useEffect(() => {
    generateRandomArray(50);
  }, [])

  const generateRandomArray = (length) => {
    let array = [];
    for (let i = 0; i < length; i++) {
      array.push({
        value: Math.floor(Math.random() * 100 + 1),
        id: i
      });
    }
    setGeneratedArray(array)
  };

  const renderDelay = (frames, speed) => {
    
    if (frames.length) {
      const [firstFrame, ...restFrames] = frames;

      setGeneratedArray(firstFrame.afterChange);
      setComparedPair(firstFrame.toCompare);

      setTimeout(() => {
        renderDelay(restFrames, speed);
      }, speed)
    } else {
      setComparedPair([]);
      // setAborted(false);
    }
  }

  const sort = () => {
    let array = [...generatedArray];

    switch (algorithm) {
      case algorithms.BUBBLE_SORT:
        bubbleSort(array, renderDelay)
        break;
      case algorithms.QUICK_SORT:
        quickSort(array, renderDelay)
        break;
      default:
        console.log(`select algorithm`);
    }
  }

  const abort = () => {
    console.log('abort')
    setAborted(true);
  }

  const generate = () => {
    generateRandomArray(50);
  }

  const selectBubble = () => {
    setAlgorithm(algorithms.BUBBLE_SORT)
  }

  const selectQuick = () => {
    setAlgorithm(algorithms.QUICK_SORT)
  }

  return (
    <div className="visualisation">
      <div className="visualisation__table">
        {generatedArray.map((arrayItem, index) => (
          <div
            key={`item-${arrayItem.id}`}
            className={classNames("visualisation__item", { "visualisation__item--highlighted": comparedPair.find((item) => item === index) })}
            style={{ height: arrayItem.value + '%' }}
          />
        ))}
      </div>
      <button onClick={abort}>abort</button><br />
      <button onClick={selectBubble}>Bubble sort</button>
      <button onClick={selectQuick}>Quick sort</button>

      <button onClick={sort}>Sort</button><br />
      <button onClick={generate}>Generate</button><br />
    </div>
  );
}

export default Visualisation;
