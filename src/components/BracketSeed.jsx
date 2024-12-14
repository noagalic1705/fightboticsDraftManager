import {
  Bracket,
  RoundProps,
  Seed,
  SeedItem,
  SeedTeam,
  RenderSeedProps,
  SingleLineSeed,
} from "react-brackets";
import React from "react";
import styled from "styled-components";

const MySeed = styled.div(
  (props) => `
  padding: 1em 1.5em;
  min-width: 225px;
  width:100%;
  position: relative;
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  @media (max-width: ${props.mobileBreakpoint}px) {
    width:100%;
  }
  @media (min-width: ${(props.mobileBreakpoint || 0) + 1}px) {
    &::after {
        content: "";
        position: absolute;
        height: 50%;
        width: 1.5em;
      [dir="rtl"] & {
        left: 0px;
      }
      [dir="ltr"] & {
        right: 0px;
      }
    }

    ::before{
      content:'x';
      border-top: ${
        (props.border === 0 || props.border === 1) && props.borderOrNull
      };
      position:absolute;
      top: -0.5px;
      width:1.5em;
      [dir="rtl"] & {
        left:-1.5em;
        }
      [dir="ltr"] & {
        right:-1.5em;
      }
    }

    ::after {
      ${props.border};
      ${props.topValue}
     [dir="rtl"] & {
        border-left: ${props.borderOrNull};
        }
      [dir="ltr"] & {
        border-right: ${props.borderOrNull};
      }
    }

}
`
);

const Empty = styled.div(`
    min-width: 225px;
  width:100%;
  position: relative;
  display: flex;
  height: 50px;
  `);

//even:
//top: -0.5px;
//odd
//top: calc(50% - 0.5px);

/*
const BracketSeed = ({
  seed,
  breakpoint,
  roundIndex,
  seedIndex,
  isMiddleOfTwoSided,
}) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not
  console.log(seed);
  // mobileBreakpoint is required to be passed down to a seed
  return (
    <>
      {seed.teams.length > 1 ? (
        <MySeed
          mobileBreakpoint={breakpoint}
          style={{ fontSize: 12 }}
          border={
            seed.border === 1
              ? "border-bottom: 1px solid #707070"
              : seed.border === 0
              ? "border-top: 1px solid #707070"
              : ""
          }
          borderOrNull={seed.border === -1 ? "none" : "1px solid #707070"}
          topValue={
            seed.border === 1
              ? "top: -0.5px;"
              : seed.border === 0
              ? "top: calc(50% - 0.5px);"
              : ""
          }
        >
          <SeedItem>
            <div>
              <SeedTeam style={{ color: "red" }}>
                {seed.teams[0]?.name || "NO TEAM "}
              </SeedTeam>
              <SeedTeam>{seed.teams[1]?.name || "NO TEAM "}</SeedTeam>
            </div>
          </SeedItem>
        </MySeed>
      ) : (
        <div>Radi</div>
      )}
    </>
  );
};
*/
const BracketSeed = ({
  seed,
  breakpoint,
  roundIndex,
  seedIndex,
  isMiddleOfTwoSided,
}) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not
  console.log(seed);
  // mobileBreakpoint is required to be passed down to a seed
  return (
    <>
      {seed.show === 1 ? (
        <Seed
          mobileBreakpoint={breakpoint}
          style={{ fontSize: 12 }}
          border={
            seed.border === 1
              ? "border-bottom: 1px solid #707070"
              : seed.border === 0
              ? "border-top: 1px solid #707070"
              : ""
          }
          borderOrNull={seed.border === -1 ? "none" : "1px solid #707070"}
          topValue={
            seed.border === 1
              ? "top: -0.5px;"
              : seed.border === 0
              ? "top: calc(50% - 0.5px);"
              : ""
          }
        >
          <SeedItem>
            <div>
              <SeedTeam style={{ color: "red" }}>
                {seed.teams[0]?.name || "NO TEAM "}
              </SeedTeam>
              <SeedTeam>{seed.teams[1]?.name || "NO TEAM "}</SeedTeam>
            </div>
          </SeedItem>
        </Seed>
      ) : (
        <Empty>X</Empty>
      )}
    </>
  );
};
export default BracketSeed;
