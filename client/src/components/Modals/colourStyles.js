import chroma from 'chroma-js';

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: '#39393A', borderColor: '#444' }),
  menu: styles => ({ ...styles, backgroundColor: '#39393A'}),
  menuList: styles => ({ ...styles, backgroundColor: '#39393A' }),
  singleValue: (styles, {isDisabled, isFocused, isSelected }) => {
    return {
    ...styles, 
    backgroundColor: '#39393A', 
    color: isDisabled
        ? '#515356'
        : isSelected
          ? '#D8D8D8'
          : isFocused
            ? '#D8D8D8'
            : '#D8D8D8'
    };
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color =  "#ccc"; //chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? '#39393A'
        : isSelected 
          ? '#030303'
          : isFocused 
            ? '#1B1B1B' //color.alpha(0.1).css() 
            : '#39393A',
      color: isDisabled
        ? '#515356'
        : isSelected
          ? '#D8D8D8'
          : isFocused
            ? '#D8D8D8'
            : '#D8D8D8',
      cursor: isDisabled 
        ? 'not-allowed' 
        : 'default',
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: 'color.alpha(0.1).css()',
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: '#D8D8D8',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: 'data.color',
      color: 'white',
    },
  }),
};

export default colourStyles