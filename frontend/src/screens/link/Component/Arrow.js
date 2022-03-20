import styled from "styled-components";

const Arrow = styled.div`
  width: 6px;
  height: 6px;
  border-top: 2px solid #f8bd89;
  border-right: 2px solid #f8bd89;
`;

export const BottomArrow = styled(Arrow)`
  transform: rotate(135deg);
  position: relative;
  left: 7px;
  bottom: 1px;
`;

export const UpArrow = styled(Arrow)`
  transform: rotate(-45deg);
  position: relative;
  left: 7px;
  top: 2px;
`;

export const RightArrow = styled(Arrow)`
  transform: rotate(45deg);
`;
