export const FlexCenter = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const FlexRow = {
  flexDirection: 'row',
  display: 'flex',
  columnGap: 2,
  alignItems: 'center',
};

export const FlexCol = {
  flexDirection: 'column',
  display: 'flex',
  rowGap: 2,
};

export const FlexColSpaceBetween = {
  ...FlexCol,
  justifyContent: 'space-between',
};

export const FlexRowSpaceBetween = {
  ...FlexRow,
  justifyContent: 'space-between',
};

export const FlexCenterRow = {
  ...FlexCenter,
  ...FlexRow,
};

export const FlexRowEnd = {
  ...FlexRow,
  justifyContent: 'flex-end',
};

export const FlexCenterCol = {
  ...FlexCenter,
  ...FlexCol,
};
