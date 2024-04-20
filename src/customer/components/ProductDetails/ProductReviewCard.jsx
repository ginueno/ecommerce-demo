import { Avatar, Box, Grid, Rating } from "@mui/material";
import React from "react";

const ProductReviewCard = ({ itemData }) => {
  let date = new Date(itemData.createdAt)
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
  }
  return (
    <div className="py-3">
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 40, height: 40, bgcolor: "#9155fd" }}
            >
              {itemData.user?.name?.[0].toUpperCase()}
            </Avatar>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <Rating
            value={itemData.score}
            name="half-rating"
            precision={0.5}
            readOnly
            sx={{
              "& .MuiRating-iconFilled": {
                color: "blue",
              },
            }}
          />
          <div className="space-y-2">
            <div>
              <p className="text-sm font-bold">{itemData.user?.name}</p>
            </div>
          </div>

          <p className="py-4">{itemData.review}</p>
          <p className="text-gray-400 text-sm">{formatDate(date)}</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
