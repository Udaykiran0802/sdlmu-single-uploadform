import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";
import "./index.css"

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [filename1, setFilename1] = useState("Choose File");
  const [filename2, setFilename2] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onChange1 = (e) => {
    setFile1(e.target.files[0]);
    setFilename1(e.target.files[0].name);
  };

  const onChange2 = (e) => {
    setFile2(e.target.files[0]);
    setFilename2(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(formData)
    formData.append("files", file);
    formData.append("files", file1);
    formData.append("files", file2);
    try {
      const res = await axios.post(
        "/oems/a66e12fe-5813-41e5-9bd7-7f859ed5cdc0/devices/0e1831f9-8404-49d1-a1ec-25b59aa18ea0/device-materials",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;
      console.log(fileName)
      const { fileName1, filePath1 } = res.data;
      const { fileName2, filePath2 } = res.data;

      setUploadedFile({ fileName, filePath });
      setUploadedFile({ fileName1, filePath1 });
      setUploadedFile({ fileName2, filePath2 });

      console.log(res);
    } catch (err) {
       if (err.response.status === 500) {
       setMessage('There was a problem with the server');
       } else {
         setMessage(err.response.data.msg);
       }
      console.log(err);
      setUploadPercentage(0);
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            required
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <div className="custom-file mb-4 w-50%">
          <input
            required
            type="file"
            className="custom-file-input"
            id="customFile1"
            onChange={onChange1}
          />
          <label className="custom-file-label" htmlFor="customFile1">
            {filename1}
          </label>
        </div>
        <div className="custom-file mb-4">
          <input
            required
            type="file"
            className="custom-file-input"
            id="customFile2"
            onChange={onChange2}
          />
          <label className="custom-file-label" htmlFor="customFile2">
            {filename2}
          </label>
        </div>
        <Progress percentage={uploadPercentage} />

        <input
          type="submit"
          value="Upload"
          className="close1  mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}

      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName1}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName2}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
