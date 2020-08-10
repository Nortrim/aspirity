import styled from "styled-components";

type BoxShadowedProps = {
    borderRadius?: string
    margin?: string
    height?: string
}

export const BoxShadowed = styled.div`
  position: relative;
  background: white;
  height:  ${({height}: BoxShadowedProps) => height || 'auto'};
  margin:  ${({margin}: BoxShadowedProps) => margin || '10px'};
  border-radius: ${({borderRadius}: BoxShadowedProps) => borderRadius || '10px'};
  box-shadow: 5px 10px 15px rgba(0,0,0,0.1);
  padding: 10px 15px;
  transition: all .5s ease-in-out;
  overflow: hidden;
`;

type IconProps = {
    pointer?: boolean
    size?: string
}

export const Icon = styled.img`
  cursor: ${({pointer}: IconProps) => pointer ? 'pointer' :  'default'};
  width: ${({size}: IconProps) => size || '20px'}; 
  height: ${({size}: IconProps) => size || '20px'}; 
`;