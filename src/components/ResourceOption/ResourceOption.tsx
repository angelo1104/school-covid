import React from "react";
import { VisualPickerOption } from "react-rainbow-components";
import styled from "styled-components";
import Image from "next/image";
import { MedicalResource } from "../../data/medicalResources";

const DarkVisualPicker = styled(VisualPickerOption)`
  margin: 0 10px;

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

function ResourceOption({ imageUrl, name }: MedicalResource) {
  return (
    <DarkVisualPicker name={name}>
      <Image
        src={imageUrl}
        alt={name}
        layout={"fill"}
        className={"display-image"}
      />
    </DarkVisualPicker>
  );
}

export default ResourceOption;
