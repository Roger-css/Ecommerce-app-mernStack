const categoryList = (cats, option = []) => {
  for (let cat of cats) {
    if (cat.children?.length > 0) {
      option.push({
        _id: cat._id,
        value: cat.name,
        parentId: cat.parentId,
        type: cat.type,
      });
      categoryList(cat.children, option);
    } else {
      option.push({
        _id: cat._id,
        value: cat.name,
        parentId: cat.parentId,
        type: cat.type,
      });
    }
  }
  return option;
};
export default categoryList;
