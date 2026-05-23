import sequelize from "../config/database.js";
import { QueryTypes } from "sequelize";
import RiderStatus from "../models/RiderStatus.js";

// Called when rider sends their GPS position
export const updateRiderLocation = async (riderId, latitude, longitude) => {
  await RiderStatus.update(
    {
      location: {
        type: 'Point',
        coordinates: [longitude, latitude], // PostGIS: lng first, lat second
      }
    },
    { where: { riderId } }
  );
};

// Called when an order is placed — finds nearest available rider
export const findNearestRider = async (customerLat, customerLng, radiusInMetres = 5000) => {
  const riders = await sequelize.query(`
    SELECT
      rs."riderId",
      ST_Distance(
        rs.location::geography,
        ST_MakePoint(:lng, :lat)::geography
      ) AS distance_metres
    FROM "RiderStatuses" rs
    WHERE
      rs.is_available = true
      AND rs.location IS NOT NULL
      AND ST_DWithin(
        rs.location::geography,
        ST_MakePoint(:lng, :lat)::geography,
        :radius
      )
    ORDER BY distance_metres ASC
    LIMIT 1
  `, {
    replacements: { lat: customerLat, lng: customerLng, radius: radiusInMetres },
    type: QueryTypes.SELECT
  });

  return riders[0] || null;
};