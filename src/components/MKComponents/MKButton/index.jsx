/**
 * Material Kit 2 PRO React - v1.0.0
 *
 * Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)
 *
 * Coded by www.creative-tim.com
 *
 * The copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

import { forwardRef } from "react";
import PropTypes from "prop-types"; // Library for typechecking of props
import MKButtonRoot from "./MKButtonRoot"; // Custom styles for MKButton

// MKButton component using forwardRef to pass refs
const MKButton = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => (
    <MKButtonRoot
      {...rest}
      ref={ref}
      color="primary" // Set color to primary by default, can be overwritten by ownerState
      variant={variant === "gradient" ? "contained" : variant} // Convert 'gradient' to 'contained'
      size={size}
      ownerState={{ color, variant, size, circular, iconOnly }}
    >
      {children}
    </MKButtonRoot>
  )
);

// Default props for the MKButton
MKButton.defaultProps = {
  size: "medium",
  variant: "contained",
  color: "white",
  circular: false,
  iconOnly: false,
};

// Prop types for MKButton
MKButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  color: PropTypes.oneOf([
    "default",
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MKButton;
