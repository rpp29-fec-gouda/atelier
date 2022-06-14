"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementIndexUp = exports.incrementIndexDown = exports.roundByIncrement = void 0;
const roundByIncrement = (ratingDecimal, increment = 25) => {
    let magnitude = 100;
    ratingDecimal -= Math.floor(ratingDecimal);
    ratingDecimal *= magnitude;
    const incrementCount = Math.floor(magnitude / increment);
    let currentIncrement = increment;
    let lastIncrement = 0;
    for (let i = 0; i < incrementCount; i++) {
        if (ratingDecimal <= currentIncrement) {
            return ratingDecimal - lastIncrement >= increment / 2
                ? currentIncrement / magnitude
                : lastIncrement / magnitude;
        }
        lastIncrement = currentIncrement;
        currentIncrement += increment;
    }
    return -1;
};
exports.roundByIncrement = roundByIncrement;
const incrementIndexDown = (index, max, min = 0, isCapped) => {
    index--;
    if (index < min) {
        if (isCapped) {
            index = min;
        }
        else if (max !== undefined) {
            index = max;
        }
    }
    return index;
};
exports.incrementIndexDown = incrementIndexDown;
const incrementIndexUp = (index, max, min = 0, isCapped) => {
    index++;
    if (max !== undefined && index >= max) {
        index = isCapped ? max : min;
    }
    return index;
};
exports.incrementIndexUp = incrementIndexUp;
