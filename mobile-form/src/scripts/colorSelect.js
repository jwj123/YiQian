const color = [
  ['#e57373', '#ef9a9a', '#ffcdd2'],
  ['#9575cd', '#b39ddb', '#d1c4e9'],
  ['#4fc3f7', '#81d4fa', '#b3e5fc'],
  ['#4db6ac', '#80cbc4', '#b2dfdb'],
  ['#4dd0e1', '#80deea', '#b2ebf2'],
  ['#7986cb', '#9fa8da', '#c5cae9'],
  ['#81c784', '#a5d6a7', '#c8e6c9'],
  ['#fff176', '#fff59d', '#fff9c4'],
  ['#aed581', '#c5e1a5', '#dcedc8'],
  ['#dce775', '#e6ee9c', '#f0f4c3'],
  ['#ffd54f', '#ffe082', '#ffecb3'],
  ['#ffb74d', '#ffcc80', '#ffe0b2'],
  ['#ff8a65', '#ffab91', '#ffccbc'],
  ['#64b5f6', '#90caf9', '#bbdefb'],
  ['#ba68c8', '#ce93d8', '#e1bee7'],
  ['#a1887f', '#bcaaa4', '#d7ccc8'],
  ['#90a4ae', '#b0bec5', '#cfd8dc'],
  ['#e0e0e0', '#eeeeee', '#f5f5f5'],
];

function colorSelect(kinds, col) {
  const result = [];
  if (col >= 3) return [];
  const colorKind = color.length;
  for (let i = 0; i < kinds; i += 1) {
    const x = i % colorKind;
    const y = col;
    result.push(color[x][y]);
  }
  return result;
}

export default colorSelect;
