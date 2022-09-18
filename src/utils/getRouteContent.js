export default (data) => {
  return () => {
    document.title = data.title;
    return data.context;
  };
};
