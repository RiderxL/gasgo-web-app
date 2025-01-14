"use client";

import { StationCard } from "@/components/cards/StationCard";
import { Root } from "@/components/styled/Layouts";
import Grid from "@mui/joy/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { GetAddress, getRandomInt } from "../Helpers";
import { useTheme } from "@mui/material/styles";
import { removeDashAndAfter } from "@/utils/parsers";

interface Props {
  stations: Station;
}

export const StationsList: React.FC<Props> = ({ stations }) => {
  const [price, setPrice] = useState(0);
  useEffect(() => setPrice(getRandomInt(50, 65)), []);
  const [distance, setDistance] = useState(0);
  useEffect(() => setDistance(getRandomInt(2, 15)), []);

  const theme = useTheme();
  const isDesktopScreens = useMediaQuery(theme.breakpoints.up(950));

  return (
    <div>
      <Root>
        <Grid container spacing={2}>
          {stations.stations?.map((station) => (
            <Grid
              item
              key={station.place_id}
              xs={12}
              md={4}
              lg={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <StationCard
                name={removeDashAndAfter(station.name)}
                mediaQuery={isDesktopScreens}
                id={station.place_id}
                address={
                  <GetAddress
                    lat={station.location.lat}
                    lng={station.location.lng}
                  />
                }
                opened={station.opening_hours?.open_now}
                price={price}
                distance={distance}
                stationObject={station}
              />
            </Grid>
          ))}
        </Grid>
      </Root>
    </div>
  );
};
