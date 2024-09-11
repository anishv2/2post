import { useState, MouseEvent } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';
import { NavLink, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Grid from '@mui/material/Grid';
import { IPost } from '@/modules/user/interfaces';
import dayjs from 'dayjs';
import UserAvatar from '@/shared/widgets/UserProfile';
import { getNameFirstLetter } from '@/shared/name.util';
import { ROUTES } from '@/routes/routeslinks';
import defaultPostImage from '@/assets/2post.jpg';
import CommentBox from './CommentBox';
import { Box, Divider } from '@mui/material';
import relativeTime from "dayjs/plugin/relativeTime";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OptionMenu from '@/components/OptionMenu';
import commentAPI from '@/shared/services/api/comment';
import postAPI from '@/shared/services/api/post';

dayjs.extend(relativeTime)


export const defaultImage=defaultPostImage;

export default function PostCard({ post }: { post: IPost }) {
  const { title, content, image, tags, createdAt }=post;
  const queryClient=useQueryClient();
  const [like, setLike]=useState(post.likes);
  const [toggle, setToggle]=useState(post.isLiked);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { USER, FEEDS }=ROUTES;
  const postUser=post.user;
  const params=useParams();
  const path=useLocation().pathname;
  const navigate=useNavigate();


  const deleteMutation = useMutation({
    mutationFn: async(commentId: string )=>{
      await commentAPI.delete(commentId);
    },
    onSuccess: () => {
    },
    onSettled:async(_,error)=>{
      if(error){
        // toast.error(`${error}`);
      }
      else { 
        queryClient.invalidateQueries({ queryKey: ['post'] }); 
      }
    }
  });

  const goToComments=()=>{
    navigate(`${USER}/${FEEDS}/${post._id}`);
  }
  
  const handleLike=async(postId: string)=>{
    setToggle(!toggle);
    if(toggle){
      if(like>0){
        setLike(like-1);
      }
      return await postAPI.unlike(postId);
    } else {
      setLike(like+1);
      return await postAPI.like(postId);
    }
  };

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();
    setAnchorEl(null);
  };

  const handleOptions = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const editHandler=(slugId: string)=>{
    console.log('comm', slugId);
  };

  const deleteHandler=async(slugId: string)=>{
    await deleteMutation.mutate(slugId);
  };


  return (
    <Grid item xs={12}>
    <Card sx={{ maxWidth: '100%', bgColor:'#fff', position:'relative', overflow:'auto' }} elevation={1}> 
      <NavLink style={{ textDecoration:'none', color:'inherit' }} to={`${USER}/${FEEDS}/${post._id}`}> 
        <CardHeader
          sx={{ textAlign:'left' }}
          avatar={
            <UserAvatar name={getNameFirstLetter(postUser.firstName)} /> 
          }
          action={
            <IconButton 
              aria-label="settings" 
              onClick={(e)=> e.preventDefault()}
            > 
              <MoreVertIcon /> 
            </IconButton> 
          }
          title={<span style={{ fontWeight: '600', marginRight:'0.5rem' }}>{`${postUser.firstName} ${postUser.lastName}`}</span>}
          subheader={dayjs(createdAt).format('MMM DD, YYYY')}
        />
      </NavLink>
      
      <CardMedia
        component="img"
        height="350"
        image={image || defaultImage}
        alt={title}
      />
      <CardActions sx={{ display: 'flex', justifyContent:'space-between', gap: '4px' }} disableSpacing>
        <IconButton aria-label="like" title='Likes' onClick={()=>handleLike(post?._id)} sx={{ borderRadius: 0 }}>
          {toggle ? <ThumbUpIcon color='primary'/> : <ThumbUpOutlinedIcon /> }
          <Typography sx={{ fontSize: '1rem ', ml: 1 }}>Like</Typography>
        </IconButton>

        <IconButton aria-label="add comments" title='comments' sx={{ borderRadius: 0 }} onClick={goToComments}>
          <CommentOutlinedIcon />
          <Typography sx={{ fontSize: '1rem ', ml: 1 }}>Comments</Typography>
        </IconButton>
      
        <IconButton aria-label="share" title='share' sx={{ borderRadius: 0 }}>
          <ShareOutlinedIcon />
          <Typography sx={{ fontSize: '1rem ', ml: 1 }}>Share</Typography>
        </IconButton>
      </CardActions>

      <CardContent sx={{ textAlign:'left', pt: 0 }}>
        <Typography align='left' sx={{ color: 'grey', fontSize: '0.9rem', cursor:'pointer' }}>
          { like ? like > 1 ? `${like} likes` : `${like} like` : ``}
        </Typography>
        <Typography variant="body2" color="text.primary">
        <span style={{ fontWeight: '600', marginRight:'0.5rem' }}>{`${postUser.firstName} ${postUser.lastName}`}</span> {title}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {content}
        </Typography>
        <Box sx={{ display:'flex', flexWrap: 'wrap' }}>
        {tags?.map((tag, index)=><Link key={index} style={{ marginRight: '0.4rem'}}>#{tag}</Link>)}
        </Box>
        {post.comments.length && path!==`${USER}/${FEEDS}/${post._id}` ? <NavLink to={`${USER}/${FEEDS}/${post._id}`} style={{ textDecoration:'none', color:'inherit' }} >
          <Typography align='left' sx={{ color: 'grey', fontSize: '0.9rem', cursor:'pointer', width:'auto', '&:hover': { textDecoration: 'underline' }} }>
            {post.comments.length > 1 ? `${post.comments.length} comments`: `${post.comments.length} comment`} 
          </Typography>
        </NavLink> : ''}
        { path ===`${USER}/${FEEDS}/${post._id}` 
         ?  <Typography align='left' sx={{ color: 'grey', fontSize: '0.9rem', cursor:'pointer', width:'auto' }}>
         {post.comments.length ? post.comments.length > 1 ? `${post.comments.length} comments`: `${post.comments.length} comment` : ""} 
        </Typography> : ""
        }

        {path===`${USER}/${FEEDS}/${post._id}` && post.comments.length ?
        <>
        <Divider sx={{ my: 2 }} />

        <Box>
          {
            post.comments.map((comt:any, index: number)=>(
              <div key={index}>
              <Box sx={{ display: 'flex', alignItems:'center', my:2 }}>
                <UserAvatar name={getNameFirstLetter(comt.user.firstName)} /> 
                <Typography sx={{ fontWeight: '600', fontSize:'0.8rem', mx:'0.5rem' }}>{`${comt.user.firstName} ${comt.user.lastName}`}</Typography> 
                <span style={{ fontSize: '0.8rem' }}>{dayjs(comt.createdAt).fromNow()}</span>
              </Box>

              <Box sx={{
                display:'flex',
                justifyContent:'space-between'
              }}>
              <Typography variant="body2">{comt.content}</Typography>
              
              <div onClick={handleOptions}>
                <MoreHorizIcon sx={{ color: 'grey', cursor: 'pointer' }} />
              </div>
              </Box>

              <OptionMenu 
                open={open} 
                anchorEl={anchorEl} 
                handleClose={handleClose} 
                slugId={comt._id} 
                deleteHandler={deleteHandler}
                editHandler={editHandler}
              />
              </div>
            ))
          }
        </Box>
        <Divider sx={{ my: 2 }} />
        </>
        : ''
        }
        
        {params?.id && <CommentBox postId={post._id} />}
        
      </CardContent>


    </Card>
    </Grid> 
  );
}
