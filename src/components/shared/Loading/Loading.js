import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import portalimg from '../../../assets/images/portalimage.png';

const CirculateAnimationDiv = styled(Box)({
    "@keyframes rotation": {
        "0%": {
          transform: "rotate(0deg)"
        },
        "100%": {
            transform: "rotate(360deg)"
        }
      },
    margin:'auto',
    width:'12rem',
    height:'12rem',
    animation: 'rotation 1.4s linear infinite',
    "img":{
        width:'12rem',
        height:'12rem',
    }
});

const Loading = () =>{
    return (
        <CirculateAnimationDiv>
             <img src={portalimg}></img>
        </CirculateAnimationDiv>
        // <CircularProgress/>
    )
}

export default Loading;