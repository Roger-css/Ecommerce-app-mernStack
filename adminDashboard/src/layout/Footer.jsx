import React from "react";

import { Typography, Stack } from "@mui/material";
function Footer() {
  return (
    <footer>
      <Stack mt="30px" direction="row" justifyContent="center" spacing={3}>
        <Typography fontSize="14px" color="primary">
          Condition of Use
        </Typography>
        <Typography fontSize="14px" color="primary">
          Privacy policy
        </Typography>
        <Typography fontSize="14px" color="primary">
          Help
        </Typography>
      </Stack>
      <Typography fontSize="13px" mt="5px">
        © 1996-, Amazon.com, Inc. or its affiliates
      </Typography>
    </footer>
  );
}

export default Footer;
