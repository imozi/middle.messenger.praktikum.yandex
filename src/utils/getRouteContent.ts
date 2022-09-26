interface RouteContext {
  title: string;
  context: string;
}

function getRouteContent(data: RouteContext): Function {
  return () => {
    document.title = data.title;
    return data.context;
  };
}

export { getRouteContent };
