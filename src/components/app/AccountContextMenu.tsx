import React, { useEffect, useState } from "react";
import { Box, Divider, IconButton, Menu, MenuItem, IconButtonProps } from "@mui/material";
import supabase from "supabase/supabaseClient";
import { Settings } from "@mui/icons-material";
import { DISCORD_BLURPLE } from "styles/theme/appTheme";

interface Props extends IconButtonProps {
  changeUsername?: () => void;
}
const AccountContextMenu = (props: Props) => {
  const { changeUsername, ...rest } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [showDiscord, setShowDiscord] = useState(false);

  useEffect(() => {
    supabase.auth.getUserIdentities().then(({ data, error }) => {
      setShowDiscord(!(data?.identities.find((e) => e.provider === "discord")))
    });
  }, []);
  const linkDiscord = async () => {
    const { data, error } = await supabase.auth.linkIdentity({
      provider: "discord", options: {
        redirectTo: window.location.href
      }
    })
    console.log(error)
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <>
      <IconButton
        id="account-settings"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        {...rest}
      >
        <Settings fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>Account Settings</MenuItem>
        {changeUsername && <MenuItem onClick={changeUsername}>Change Display Name</MenuItem>}
        {showDiscord
          ? <MenuItem onClick={linkDiscord}>Link Discord</MenuItem>
          : null
        }
        <Divider component="li"></Divider>
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </Menu>
    </>
  );
}
export default AccountContextMenu;