import styled, { css } from 'styled-components'

const sizeCSS = {
  small : css`
    width: 64px;
    height: 32px;
    padding: 16px 0;
  `,
  medium: css`
    width: 96px;
    height: 48px;
    padding: 16px 0;
  `,
  large: css`
    width: 128px;
    height: 64px;
    padding: 16px 0;
  `,
  full: css`
    width: 100%;
    aspect-ratio: 8 / 1;
    padding: 16px 0;
  `
}

// font-size
const fontCSS = {
  h1: css`
    font-size: ${({theme}) => theme.FONT_SIZE["h1"]};
    line-height: ${({theme}) => theme.FONT_LINE["h1"]};
  `,
  h2: css`
    font-size: ${({theme}) => theme.FONT_SIZE["h2"]};
    line-height: ${({theme}) => theme.FONT_LINE["h2"]};
  `,
  h3: css`
    font-size: ${({theme}) => theme.FONT_SIZE["h3"]};
    line-height: ${({theme}) => theme.FONT_LINE["h3"]};
  `,
  h4: css`
    font-size: ${({theme}) => theme.FONT_SIZE["h4"]};
    line-height: ${({theme}) => theme.FONT_LINE["h4"]};
  `,
  h5: css`
    font-size: ${({theme}) => theme.FONT_SIZE["h5"]};
    line-height: ${({theme}) => theme.FONT_LINE["h5"]};
  `,
  h6: css`
    font-size: ${({theme}) => theme.FONT_SIZE["h6"]};
    line-height: ${({theme}) => theme.FONT_LINE["h6"]};
  `,
  h7: css`
    font-size: ${({theme}) => theme.FONT_SIZE["h7"]};
    line-height: ${({theme}) => theme.FONT_LINE["h7"]};
  `,
  h8: css`
    font-size: ${({theme}) => theme.FONT_SIZE["h8"]};
    line-height: ${({theme}) => theme.FONT_LINE["h8"]};
  `,
  h9: css`
    font-size: ${({theme}) => theme.FONT_SIZE["h9"]};
    line-height: ${({theme}) => theme.FONT_LINE["h9"]};
  `
}

// color
const colorCSS = {
  primary : css`
    color: ${({theme}) => theme.PALLETE.primary["main"]};
  `,
  gray100 : css`
    color: ${({theme}) => theme.PALLETE.gray["100"]};
  `,
}
 
// border
const borderCSS = {
  primary: css`
    border: solid 1px ${({theme}) => theme.PALLETE.primary["main"]};
  `,
}

// shape
const shapeCSS = {
  small: css`
    border-radius: 4px;
  `,
  large: css`
    border-radius: 10px;
  `,
  round: css`
    border-radius: 50%;
  `
}

const MyTestButton = styled.button`
  background-color: green;
  ${({size}) => sizeCSS[size]};
  ${({font}) => fontCSS[font]};
  ${({shape}) => shapeCSS[shape]};
  ${({color}) => colorCSS[color]};
`;

export default MyTestButton;

