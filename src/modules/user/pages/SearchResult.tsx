import Item from '@/components/Item'
import { getNameFirstLetter } from '@/shared/name.util'
import UserAvatar from '@/shared/widgets/UserProfile'
import { Box, Button, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import userAPI from '@/shared/services/api/user'
import Spinner from '@/shared/widgets/Spinner'
import NoData from '@/shared/widgets/NoData'
import { useAppSelector } from '@/redux/store/store'
import AlertCard from '@/shared/widgets/AlertCard'


const UserCard=({user }: { user: any })=>{
  const auth=useAppSelector(state=>state.auth);
  const queryClient=useQueryClient();

  const followMutation=useMutation({
    mutationFn: async(userId: string)=>await userAPI.follow(userId),
    onSuccess: () => {
      
    },
    onSettled:async(_,error)=>{
      if(error){
        return <AlertCard message={error.message} severity="error" />;
      }
      else queryClient.invalidateQueries({ queryKey: ['search'] })
    }
  });

  const unfollowMutation=useMutation({
    mutationFn: async(userId: string)=>await userAPI.unfollow(userId),
    onSuccess: () => {
      
    },
    onSettled:async(_,error)=>{
      if(error){
        return <AlertCard message={error.message} severity="error" />;
      }
      else queryClient.invalidateQueries({ queryKey: ['search'] })
    }
  });


  const follow=async(id: string)=>{
    await followMutation.mutate(id);
  }
  const unfollow=async(id: string)=>{
    await unfollowMutation.mutate(id);
  }

return <Item 
  elevation={1} 
  sx={{
    display:'flex',
    justifyContent:'space-between',
    padding: '1rem',
    margin:'5px 0'
  }}>
    <div style={{ display: 'flex', alignItems:'center', gap: 2 }}>
      <UserAvatar name={getNameFirstLetter(user.firstName as string)} />
      <Typography ml={2}>
        {user.firstName} {user.lastName}
      </Typography>
    </div>
    <div>
      { auth.id === user._id ? "" : !user.isFollowing ? 
      <Button color='primary' variant='contained' onClick={()=>follow(user._id)}>Follow</Button>
       :
       <Button sx={{ ml: 2 }} color='info' variant='contained' onClick={()=>unfollow(user._id)}>Unfollow</Button>
       }
    </div>
  </Item>
}

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const { data, error, isError, isPending }=useQuery({
    queryKey:['search', searchParams.get('q')],
    queryFn: async()=>await userAPI.search(searchParams.get('q') as string)
  });

  const users= data?.data?.users;
  
  if(isPending){
    return <Spinner />
  }
  if(!users.length){
    return <NoData message='No users found'/>
  }
  if(isError){
    return <AlertCard severity='error' message={error.message} />
  }

  return (
    <Box>
      {users.map((user:any)=>{
        const newUser={
          ...user,
          isFollowing: user.followings.some(()=>user._id)
        };
        return <UserCard key={user._id} user={newUser} />
      })}
    </Box>
  )
}

export default SearchResult