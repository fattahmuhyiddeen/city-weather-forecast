export const degreesToRadians = degrees => degrees * Math.PI / 180;

export const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
  const earthRadiusKm = 6371;
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const latDistance = degreesToRadians(lat1);
  const lngDistance = degreesToRadians(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latDistance) * Math.cos(lngDistance);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};
