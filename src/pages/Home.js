import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";

import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <Typography variant="h1">SPS REACT TEST</Typography>

      <MuiLink
        to="/users"
        component={Link}
      >
        <Typography>Usuários</Typography>
      </MuiLink>
    </Container>
  );
}

export default Home;
