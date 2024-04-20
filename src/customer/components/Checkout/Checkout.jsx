import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import DeliveryAdress from "./DeliveryAdress";
import OrderSummary from "./OrderSummary";

const steps = [
  "Đăng nhập",
  "Chọn địa chỉ giao hàng",
  "Chi tiết hóa đơn",
  "Thanh toán",
];

export default function Checkout() {

  const [skipped, setSkipped] = React.useState(new Set())
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const navigate = useNavigate()
  const step = querySearch.get("step");
  const [activeStep, setActiveStep] = React.useState(step);

  const handleNext = () => {
    let newSkipped = skipped
    setActiveStep(activeStep + 1);
    setSkipped(newSkipped)
  };

  const handleBack = () => {
    if (step === 3) navigate(`/checkout?step=${step - 1}`)
    else navigate(`/cart`)
  };

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div>
      <div className=" px-20">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={step - 1}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
              </Box>
              <div>{step == 2 ? <DeliveryAdress handleNext={handleNext} /> : <OrderSummary />}</div>
            </React.Fragment>
          )}
        </Box>
      </div>
    </div>
  );
}
