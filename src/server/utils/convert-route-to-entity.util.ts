const mapping: Record<string, string> = {
  clients: 'client',
  'license-plates': 'license_plate',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
