import React from "react";
import { IconButton, Input } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import styled from "styled-components";

const CloseButton = styled(IconButton)`
  padding: 3px !important;
  color: gray;
  outline: none;

  &:focus {
    outline: none;
  }

  @media only screen and (min-width: 728px) {
    padding: 6px !important;
  }
`;

function Header() {
  return (
    <header
      className={
        "border border-gray-200 py-4 px-1 md:px-8 flex flex-row items-center bg-white"
      }
    >
      <p
        className={
          "text-2xl md:text-3xl lg:text-4xl text-gray font-bold justify-self-start"
        }
      >
        Tweeties
      </p>

      <div
        className={
          "m-auto w-3/5 md:w-4/6 flex justify-between border-2 border-gray-300 rounded-xl py-1 px-3"
        }
      >
        <Input
          className={"flex-grow"}
          disableUnderline
          placeholder={"search"}
        />
        <CloseButton>
          <Close />
        </CloseButton>
      </div>
    </header>
  );
}

export default Header;
