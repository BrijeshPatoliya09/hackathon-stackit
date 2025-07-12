const getRelations = (item, result = [], sufix = '') => {
  if (item) {
    item.map((a) => {
      if (a.selectionSet) {
        if (a.name.value !== 'response') {
          result.push(sufix + a.name.value);
          result = getRelations(
            a.selectionSet.selections,
            result,
            sufix + a.name.value + '.',
          );
        }
      }
    });
  }
  return result;
};

export const getAllRelations = (info) => {
  return getRelations(info.fieldNodes[0].selectionSet.selections);
};
