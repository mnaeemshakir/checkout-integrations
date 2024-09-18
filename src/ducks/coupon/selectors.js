export const selectors = ({ coupon }) => ({
  percentOff: coupon.data.percentOff,
  id: coupon.data.id,
  name: coupon.data.name,
  valid: coupon.data.valid,
});
