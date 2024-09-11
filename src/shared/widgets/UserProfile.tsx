
const UserAvatar = ({ name }:{ name: { letter: string, bgColor: string } }) => {
    return (
        <div style={{
            height:'30px',
            width:'30px',
            background:`${name?.bgColor}`,
            borderRadius: '50%',
            color:'#fff',
            fontSize:'1rem',
            fontWeight:'400',
            display:'grid',
            placeItems:'center',
        }}>
            <span>{name?.letter}</span>
        </div>
    )
}

export default UserAvatar;