import Cropper from "cropperjs";

export default {
  /**
   * Edits the selected image
   * @param {File} file
   */
  edit() {
    const image = document.getElementById("image");
    const cropper = new Cropper(image, { aspectRatio: 4 / 5 });

    document.getElementById("download").onclick = () => {
      cropper.getCroppedCanvas().toBlob((blob) => {
        downloadBlob(blob, "photo.jpeg");
      }, "image/jpeg");
    };
  },
};

function downloadBlob(blob, name = "file.txt") {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  // Remove link from body
  document.body.removeChild(link);
}
