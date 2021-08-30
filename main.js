import Editor from "./edit";

Dropzone.autoDiscover = false;
const myDropzone = new Dropzone("#upload-zone", {
  maxFiles: 1,
  acceptedFiles: "image/*",
  dictDefaultMessage: "Drag & Drop your Image or click to Browse",
  autoProcessQueue: false,
});

myDropzone.on("addedfile", function (file) {
  file.previewElement.addEventListener("click", function () {
    myDropzone.removeFile(file);
  });

  if (!/image\/.+/.test(file.type)) {
    setTimeout(() => {
      this.removeFile(file);
      alert("File not supported");
    }, 500);
  }
});

myDropzone.on("maxfilesexceeded", function (file) {
  this.removeAllFiles();
  this.addFile(file);
});

document.getElementById("proceed-btn").onclick = () => {
  if (myDropzone.getAcceptedFiles().length === 1) {
    const file = myDropzone.getAcceptedFiles()[0];
    console.log("Preview Done: ", file);
    document.getElementById("preview").hidden = true;
    document.getElementById("edit").hidden = false;

    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("image").src = e.target.result;
      Editor.edit();
    };
    reader.readAsDataURL(file);
  }
};
