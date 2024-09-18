export const selectors = ({ snackbar }) => ({
  open: snackbar.data.open,
  message: snackbar.data.message,
  severity: snackbar.data.severity,
});
