import React from "react";
import { Box, BoxProps, LinkProps, Typography } from "@mui/material";
import Link from "components/base/Link";
import Image from "components/base/Image";

export const getLogoUrl = () => {
  const date = new Date();

  switch (date.getMonth()) {
    case 1:
    case 12:
      return "holiday";
    case 5:
    case 6:
      return "celebration";
    default:
      return "default";
  }
}

interface Props extends BoxProps {
  LinkProps?: LinkProps;
  full?: boolean;
  hideSubtitle?: boolean;
}
const Logo = (props: Props) => {
  const { LinkProps, full, hideSubtitle, children, ...rest } = props;

  const suffix = (full ? "-h" : (hideSubtitle ? "" : "-v"))

  return (
    <Link href="/" title="Krooster"
      {...LinkProps}
    >
      <Image
        src={`/assets/title/${getLogoUrl()}${suffix}.png`}
        alt="Krooster - Arknights Roster"
        {...rest}
      />
      {children}
    </Link>
  );
}
export default Logo;