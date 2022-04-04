import { DefaultTheme }from 'styled-components';

const Color = {
  Line: '#333D47',
  TextSecond: '#D3DEE8',
  TextPrimary: '#FFFFFF',
  Darkest: '#0e171f',
  Darker: '#162029',
  Dark: '#29343d'
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
    height: '80px',
    text: {
      primary: Color.TextPrimary,
      secondary: Color.TextSecond
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