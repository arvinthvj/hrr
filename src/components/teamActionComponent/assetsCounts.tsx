import React from "react";
import { GetImgaeFromS3Bucket } from "../../services/s3Bucket";
import { UserIcon } from "../imagepath";
import { AssetNameAndIcons, Descriptions } from "./constant";

export const AssetsCounts = ({ assetsDetails, memberCount }) => {
  const defaultValue = [
    {
      id: 1,
      name: AssetNameAndIcons.workspace,
      icon_images: AssetNameAndIcons.deskIcon,
      count: 0,
    },
    {
      id: 2,
      name: AssetNameAndIcons.room,
      icon_images: AssetNameAndIcons.roomIcon,
      count: 0,
    },
    {
      id: 3,
      name: AssetNameAndIcons.parking,
      icon_images: AssetNameAndIcons.parkingIcon,
      count: 0,
    },
  ];
  const assetsView = (id, img, label, count, defaultValue = false) => {
    return (
      <>
        <div className="location-assetsImage">
          {defaultValue || label == "Members" ? (
            <img src={img} alt="" />
          ) : (
            <GetImgaeFromS3Bucket
              imageFile={img}
              type={"image"}
              FilePath="gat"
            />
          )}
        </div>
        <div className="location-assetsNameAndCount">
          <span>{Descriptions.active}</span>
          <label className="location-assetsName">{label}</label>
          <label className="location-assetCount">{count}</label>
        </div>
      </>
    );
  };

  return (
    <div className="location-assetsContainer">
      <div className="location-assetsList">
        <div className="location-assetViewStyles">
          {assetsView(
            0,
            UserIcon,
            "Members",
            memberCount?.user_count ? memberCount?.user_count : 0,
            false
          )}
        </div>
        {assetsDetails != "No data" && assetsDetails?.length > 0
          ? assetsDetails?.map((assets, index) => {
              return (
                <div className="location-assetViewStyles" key={assets?.id}>
                  {assetsView(
                    assets?.id,
                    assets?.icon_images,
                    assets?.name,
                    assets?.count
                  )}
                </div>
              );
            })
          : defaultValue?.map((assets, index) => {
              return (
                <div className="location-assetViewStyles" key={assets?.id}>
                  {assetsView(
                    assets?.id,
                    assets?.icon_images,
                    assets?.name,
                    assets?.count,
                    false
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
};
