import { useState, MouseEvent } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/routeslinks';
import OptionMenu from '@/components/OptionMenu';
import { defaultImage } from '@/modules/posts/components/PostCard';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import postAPI from '@/shared/services/api/post';
import { useAppDispatch } from '@/redux/store/store';
import { addPost } from '@/redux/slices/post';


export default function GridPostCard(post: any) {
  const { USER, FEEDS }=ROUTES;
  const queryClient=useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate=useNavigate();
  const dispatch=useAppDispatch();

  const deleteMutation = useMutation({
    mutationFn: async(postId: string )=>{
      await postAPI.delete(postId);
    },
    onSuccess: () => {
    },
    onSettled:async(_,error)=>{
      if(error){
          // toast.error(`${error}`);
      }
      else { 
          queryClient.invalidateQueries({ queryKey: ['userData'] }); 
      }
    }
  });
     
  const editHandler=(slugId: string)=>{
    navigate(`/user/post/${slugId}/edit`);
    dispatch(addPost({}));
  };

  const deleteHandler=async(slugId: string)=>{
    await deleteMutation.mutate(slugId);
  };

  const handleOptions = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: MouseEvent) => {
    event.preventDefault();
    // deleteMutation.mutate(slugId);
    setAnchorEl(null);
  };
  
  return (
    <>
    <NavLink to={`${USER}/${FEEDS}/${post._id}`}>
      <Card sx={{ position:'relative', maxWidth: '100%', m: 1, cursor: 'pointer', ":hover": { opacity: '0.8' } }}>
          <IconButton 
          aria-label="options" 
          sx={{ position: 'absolute', right: 0, color:'#ddd', background: '#0005' }} 
          onClick={handleOptions}
          >
            <MoreVertIcon />
          </IconButton>
          <OptionMenu 
            open={open} 
            anchorEl={anchorEl} 
            handleClose={handleClose} 
            deleteHandler={deleteHandler} 
            editHandler={editHandler} 
            slugId={post._id} 
          />
        
        <CardMedia sx={{ height: 180 }} image={post.image || defaultImage} title={post.title} />
      </Card>
    </NavLink>
    </>
  );
}

