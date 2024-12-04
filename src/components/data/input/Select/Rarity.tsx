import React, { useContext } from "react";
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from "@mui/material";
import { rarityColors } from "styles/rarityColors";
import { Star } from "@mui/icons-material";
import { DisabledContext } from "./SelectGroup";

interface Props extends Omit<ToggleButtonGroupProps, "onChange"> {
  onChange: (rarity: number) => void;
}
const Rarity = (props: Props) => {
  const { value, onChange, disabled: _disabled = false, sx, ...rest } = props;

  const disabled = useContext(DisabledContext) || _disabled;

  return (
    <ToggleButtonGroup
      value={value}
      aria-label="Rarity"
      disabled={disabled}
      onChange={(_, r) => onChange(r)}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        ...sx,
      }}
      {...rest}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <ToggleButton
          key={i}
          value={i}
          sx={{
            color: rarityColors[i],
            height: 48,
          }}
        >
          {i} <Star fontSize="small" />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
export default Rarity;