import { DefaultTheme }from 'styled-components';

const Color = {
  Line: '#333D47',
  TextSecond: '#57606a',
  TextPrimary: '#24292f',
  TextSecondD: '#D3DEE8',
  TextPrimaryD: '#FFFFFF',
  Darkest: '#f6f8fa',
  Darker: '#162029',
  Dark: '#24292f'
};


const Theme: DefaultTheme = {
  page: {
    background: Color.Darkest,
  },
  border: {
    color: Color.Line,
    width: '2px'
  },
  card: {
    borderRadius: '0.5rem'
  },
  navbar: {
    background: Color.Dark,
    height: '62px',
    text: {
      primary: Color.TextPrimaryD,
      secondary: Color.TextSecondD
    }
  },
  text: {
    primary: Color.TextPrimary,
    secondary: Color.TextSecond
  }
}

export default Theme;


// #0e171f
// #162029
// #29343d
// #333D47 - line
// #D3DEE8 - text