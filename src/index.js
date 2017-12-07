module.exports = function longestConsecutiveLength(array) {
    const highScoresMap = {};
    let Store = [];
    const longestSliceLength = array.reduce((longestSliceLength, currValue) => {
        const leftNeighbour = Store[currValue - 2];
        const me = currValue;
        const rightNeighbour = Store[currValue];

        Store[currValue - 1] = currValue;
        highScoresMap[me] = {
            recordLength: 1,
            starter: currValue
        };

        if (rightNeighbour in highScoresMap) {
            highScoresMap[me] = highScoresMap[rightNeighbour];
            highScoresMap[me].recordLength++;
            highScoresMap[me].starter = me;
        }
        if (leftNeighbour in highScoresMap) {
            highScoresMap[leftNeighbour].recordLength += highScoresMap[me].recordLength;
            highScoresMap[me] = highScoresMap[leftNeighbour];
        }

        return Math.max.apply(null, [
            longestSliceLength,
            highScoresMap[me].recordLength
        ]);
    }, 0);

    return longestSliceLength === 1
        ? 0
        : longestSliceLength;
};
