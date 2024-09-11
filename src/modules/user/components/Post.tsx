import { Grid, IconButton } from "@mui/material";
import Item from "@/components/Item";
import { useParams, useNavigate } from "react-router-dom";
import PostCard from "@/modules/posts/components/PostCard";
import postAPI from "@/shared/services/api/post";
import { useQuery } from "@tanstack/react-query";
import NoData from "@/shared/widgets/NoData";
import Spinner from "@/shared/widgets/Spinner";
import AlertCard from "@/shared/widgets/AlertCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Post = () => {
  const params=useParams();
  const navigate=useNavigate();
  const { isPending, isLoading, error, isError, data } = useQuery({
    queryKey: ['post', params.id],
    queryFn: async() => await postAPI.fetchById(params.id || ''),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const post=data?.data;

  if (isLoading || isPending) {
    return (
      <Grid item xs={12} md={9}>
        <Spinner />
      </Grid>
    );
  }

  if(post===undefined){
   return <NoData message="No data..." />; 
  }

  if (isError) {
    return <AlertCard message={error.message} severity="error" />;
  }
  return (
      <Item elevation={0} sx={{ textAlign: 'left' }}>
        <IconButton
          href=""
          size="large"
          aria-label="show more"
          aria-haspopup="true"
          color="inherit"
          onClick={()=>navigate(-1)}
          sx={{
            // margin:'3rem auto', 
            // position: 'fixed',
            // bottom: '0',
            // right: '10%',
            // borderRadius: '50%',
            // background: '#3f50b5',
            // color: '#fff'
          }}
        >
            <ArrowBackIcon />
        </IconButton>
        <Grid container spacing={2}>
          <PostCard post={post} />
        </Grid>
      </Item>
  );
};

export default Post;
