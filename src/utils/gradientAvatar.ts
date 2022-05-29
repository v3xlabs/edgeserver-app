import hslRgb from 'hsl-rgb';
import hslTriad from 'hsl-triad';
import stringHash from 'string-hash';

const uniqueID = () => Math.floor(Math.random() * Date.now());

export const gradientAvatar = (string_: string, size?: number) => {
    const hash = stringHash(string_);
    const colors = hslTriad(hash % 360, 1, 0.5);
    const color1 = hslRgb(
        colors.at(0).at(0),
        colors.at(0).at(1),
        colors.at(0).at(2)
    );
    const color2 = hslRgb(
        colors.at(1).at(0),
        colors.at(1).at(1),
        colors.at(1).at(2)
    );
    const color1string = `rgb(${color1.at(0)}, ${color1.at(1)}, ${color1.at(
        2
    )})`;
    const color2string = `rgb(${color2.at(0)}, ${color2.at(1)}, ${color2.at(
        2
    )})`;
    const id = uniqueID();

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg ${
        size != undefined
            ? 'width="' + size + 'px" height="' + size + 'px"'
            : ''
    } viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="${id}">
      <stop stop-color="${color1string}" offset="0%"></stop>
      <stop stop-color="${color2string}" offset="100%"></stop>
    </linearGradient>
  </defs>
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <rect id="Rectangle" fill="url(#${id})" x="0" y="0" width="80" height="80"></rect>
  </g>
</svg>`;
};
