import { Container, Grid, Typography } from "@mui/material";

const Error = () => {
  return (
    <Container>
      <Grid container sx={{ display: 'grid', placeItems:' center', minHeight: '100vh'}}>
        <Typography component="h5" variant="h5">
          404 | Not Found
        </Typography>
      </Grid>
    </Container>
  );
};

export default Error;
