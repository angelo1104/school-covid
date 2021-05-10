import React from "react";
import { VisualPickerOption } from "react-rainbow-components";
import styled from "styled-components";
import Image from "next/image";

const DarkVisualPicker = styled(VisualPickerOption)`
  span[data-id="visual-picker_option"] {
    background: transparent !important;
  }

  span,
  svg {
    z-index: 100 !important;
  }

  .display-image {
    border-radius: 22px;
  }
`;

function ResourceOption() {
  return (
    <DarkVisualPicker name={"oxygen"}>
      <Image
        src={"/images/mac.jpg"}
        alt={"oxygen"}
        layout={"fill"}
        className={"display-image"}
      />
    </DarkVisualPicker>
  );
}

export default ResourceOption;
