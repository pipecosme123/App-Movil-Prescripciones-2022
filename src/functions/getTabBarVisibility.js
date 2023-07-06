export const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
    if (routeName === ROUTE.PAPER_PRESCRIPCION) {
      return "none";
    }
  };