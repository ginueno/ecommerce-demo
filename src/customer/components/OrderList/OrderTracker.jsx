import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const steps = [
  "Đã đặt",
  "Xác nhận đơn hàng",
  "Đang giao",
  "Giao hàng thành công",
];

const OrderTracker = ({ activeStep }) => {
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel sx={{ color: "#9155FD", fontSize: "44px" }}>
              {step}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracker;
