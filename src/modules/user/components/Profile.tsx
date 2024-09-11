import { Box, Divider, Grid, Typography } from "@mui/material";
import Item from "@/components/Item";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import GridPostCard from "./GridPostCard";
import { useQuery } from "@tanstack/react-query";
import userAPI from "@/shared/services/api/user";
import Spinner from "@/shared/widgets/Spinner";
import AlertCard from "@/shared/widgets/AlertCard";
import NoData from "@/shared/widgets/NoData";
import { useAppSelector } from "@/redux/store/store";


const Profile = () => {
  const auth=useAppSelector(state=>state.auth);
  const userName=`${auth.firstName} ${auth.lastName}`;
  const { isPending, error, isError, data } = useQuery({
    queryKey: ['userData'],
    queryFn: async() => await userAPI.posts(),
  });
  const userData=data?.data;

  const user={
    followers: userData?.followers,
    following: userData?.following
  }


  if(isPending){
    return <Grid item xs={12} md={9}><Spinner /></Grid>
  }
  if(isError) {
    return <AlertCard message={error.message} severity="error" />
  }
  
  return (
    <>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={3} md={2} lg={3} xl={2}>
            <Card
              sx={{ width: "100%", borderRadius: "50%", maxWidth: 200 }}
              elevation={0}
            >
              <CardMedia
                component="img"
                image="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                // image="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/385fdc07-325d-49f4-b941-2d39634f1cdb/2876b1ae-c518-416a-9b1f-0dadd6fa45bb.png"
                alt="profile pic"
              />
            </Card>
          </Grid>
          <Grid item xs={9} md={7} lg={6} xl={7}>
            <Item elevation={0}>
              <Box component="div" m={1} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6">{userName ?  userName : "David Paul"}</Typography>
                {/* <Button variant="outlined" sx={{ mx: 2 }}>
                  Edit Profile
                </Button> */}
              </Box>
              <Box m={1} sx={{ display:'flex', justifyContent:'start' }}>
                <Typography mr={2} align="left" variant="body1">{user.followers} <br/>Followers</Typography>
                <Typography align="left" variant="body1">{user.following} <br/>Following</Typography>
              </Box>
            </Item>
          </Grid>
        </Grid>
        <Typography mt={4} px={5} variant="body2">POSTS</Typography>
        <Divider sx={{my: 1}} />
        <Grid container>
          {userData.posts.length ? userData?.posts?.map((post: any)=><Grid key={post?._id} item xs={12} sm={4} md={4}>
            <GridPostCard {...post} />
          </Grid>)
          :
          <NoData message="No posts..." />
          }
        </Grid>
    </>
  );
};

export default Profile;
