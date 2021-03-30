const textOverCut = (text: string = ""): string => {
  if (text.length > 160) {
    text = text.substring(0, 157) + "...";
  } else if (!text) {
    text = "";
  }

  return text;
};

export default textOverCut;
