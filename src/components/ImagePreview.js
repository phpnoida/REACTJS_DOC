import { useState } from "react";

const ImagePreview = (props) => {
  const { file } = props;
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <div>
      {preview ? (
        <img src={preview} height="200px" width="200px" alt=''/>
      ) : (
        "Loading.."
      )}
    </div>
  );
};

export default ImagePreview;
