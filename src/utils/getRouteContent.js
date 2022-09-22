function getRouteContent(data) {
  return () => {
    document.title = data.title;
    return data.context;
  };
}

export { getRouteContent };
