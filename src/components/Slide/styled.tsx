import styled from "styled-components";

type Props = {
  width?: number;
};

export const Banner = styled.div<Props>`
  min-width: 300px;
  max-width: 500px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 30px;
  background: #f2784b;
`;

export const StyleSlider = styled.div<Props>`
  width: ${({ width }) => width}px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const SliderTrack = styled.div<Props>`
  display: flex;
  transition: all 0.5s ease-in-out;
`;

export const Title = styled.div<Props>`
  width: ${({ width }) => width}px;
  font-size: 18px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  outline: none;
  padding: 15px 0 16px 24px;
  cursor: pointer;

  a {
    text-decoration: none;
    color: #fff;
  }
`;

export const NavWrap = styled.div`
  flex-basis: 56px;
  flex-shrink: 0;
  padding-right: 20px;
  text-align: right;
  font-size: 0;
`;

export const Nav = styled.div`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: #fff;
  opacity: 0.3;
  margin: 0 3px;
  cursor: pointer;

  &.current {
    opacity: 1;
  }
`;
