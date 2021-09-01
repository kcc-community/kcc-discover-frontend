import React from "react";
import Button from "./Button";
import IconButton from "./IconButton";

interface Props {
  onClick?: () => void;
  expanded?: boolean;
}

export const ExpandableButton: React.FC<Props> = ({ onClick, expanded, children }) => {
  return (
    <IconButton aria-label="Hide or show expandable content" onClick={onClick}>
      {children}
    </IconButton>
  );
};
ExpandableButton.defaultProps = {
  expanded: false,
};

export const ExpandableLabel: React.FC<Props> = ({ onClick, expanded, children }) => {
  return (
    <Button
      variant="text"
      aria-label="Hide or show expandable content"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
ExpandableLabel.defaultProps = {
  expanded: false,
};
