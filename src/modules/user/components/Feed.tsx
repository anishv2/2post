import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store/store";
import { useQuery } from "@tanstack/react-query";
import { Grid, Button } from "@mui/material";
import Item from "../../../components/Item";
import PostCard from "../../posts/components/PostCard";
import Spinner from "@/shared/widgets/Spinner";
import postAPI from "@/shared/services/api/post";
import AlertCard from "@/shared/widgets/AlertCard";
import NoData from "@/shared/widgets/NoData";
import { addPosts } from "@/redux/slices/post"; 


const Feed = () => {
  const [page, setPage]=useState<number>(1);
  // const queryClient=useQueryClient();
  const { isPending, error, isError, isSuccess, data } = useQuery({
    queryKey: ["posts", page],
    queryFn: async () => await postAPI.fetch(page)
  });
  const postState=useAppSelector(state=>state.posts.posts);
  const dispatch=useAppDispatch();
  // const [lastScrollY, setLastScrollY] = useState<number>(0);
  // const [scrollDirection, setScrollDirection] = useState<string | null>(null);

  const posts = data?.data?.posts || [];
  const totalPages =  data?.data?.totalPages;

  // const handleBackToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth"
  //   });
  // };

  const handleLoadMore=()=>{
    setPage(prevPage=>prevPage+1);
    const allPosts=[...postState, ...posts];
    // queryClient.invalidateQueries({ queryKey: ["posts"] });
    dispatch(addPosts(allPosts));
  };

  useEffect(()=>{
    // if (isSuccess && posts.length > 0) {
    //   const uniquePosts = [...new Map([...postState, ...posts].map(post => [post._id, post])).values()];
    //   dispatch(addPosts(uniquePosts));
    // }
    dispatch(addPosts(posts));
    return ()=>{
      dispatch(addPosts([]));
    }
  },[isSuccess, dispatch]);


  // const handleScroll = useCallback(() => {
  //   const currentScrollY = window.scrollY;
  
  //   if (currentScrollY > lastScrollY) {
  //     setScrollDirection('down');
  //   } else {
  //     setScrollDirection('up');
  //   }
  
  //   setLastScrollY(currentScrollY);
  // }, [lastScrollY]); 
  
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [handleScroll]);

  
  if(isPending) {
    return <Grid item xs={12} md={9}><Spinner /></Grid>
  }

  if(!postState?.length){
    return <NoData message="No posts..." /> 
  }

  if(isError) {
    return <AlertCard message={error.message} severity="error" /> 
  }

  return (
    <>
      <Item elevation={0}>
        <Grid container spacing={2}>
          {postState?.map((post: any) => {            
            return <PostCard key={post._id} post={post} />
          })}
          {page < totalPages &&
            <Button variant="contained" sx={{ margin:'3rem auto' }} onClick={handleLoadMore}>
              Load more...
            </Button>
          }
          
           {/* {scrollDirection === 'down' && 
          <IconButton
            href=""
            size="large"
            aria-label="show more"
            aria-haspopup="true"
            onClick={handleBackToTop}
            color="inherit"
            sx={{
              margin:'3rem auto', 
              position: 'fixed',
              bottom: '0',
              right: '10%',
              borderRadius: '50%',
              background: '#3f50b5',
              color: '#fff'
            }}
          >
            <ExpandLessIcon />
          </IconButton> 
          } */}
        </Grid>
      </Item>
    </>
  );
};

export default Feed;
