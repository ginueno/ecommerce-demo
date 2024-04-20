import React from "react";

const AdressCard = (address) => {
  return (
    <div className="pb-3 text-sm">
      <div className="space-y-3">
        <p className="font-semibold">{address.address?.name}</p>
        <p>{address.address?.detailAddress}</p>
        <p>{address.address?.ward}, {address.address?.city}, {address.address?.region}</p>
        <div className="space-y-1">
          <p className="font-semibold">Số điện thoại:</p>
          <p>{address.address?.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default AdressCard;
