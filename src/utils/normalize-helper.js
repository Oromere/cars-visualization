function normalizeValue(min, max, value) {
  return (value - min) / (max - min);
}

function normalizeDataSet(value, array) {
  const valMax = Math.max(...values);
  const valMin = Math.min(...values);
  return values.map((value) => normalizeValue(valMin, valMax, value));
}

export const normalizeDataSets = (datasets) => {
  return datasets.map((dataset) => ({
    ...dataset,
    data: normalizeDataSet(dataset.data),
  }));
};
