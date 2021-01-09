export const range = (start, end) =>
    [...Array(end).keys()].map(item => item + start)
