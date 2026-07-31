function attachUploadHandler(inputId, imageId) {
  const input = document.getElementById(inputId);
  const image = document.getElementById(imageId);

  if (!input || !image) return;

  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
      image.classList.remove('align-left', 'align-right', 'align-center');
      image.classList.add('align-center');
    };
    reader.readAsDataURL(file);
  });
}

attachUploadHandler('upload-photo-1', 'page-photo-1');
attachUploadHandler('upload-photo-2', 'page-photo-2');
attachUploadHandler('upload-photo-3', 'page-photo-3');
attachUploadHandler('upload-photo-4', 'page-photo-4');
attachUploadHandler('upload-photo-5', 'page-photo-5');
attachUploadHandler('upload-photo-6', 'page-photo-6');
attachUploadHandler('upload-photo-7', 'page-photo-7');
attachUploadHandler('upload-photo-8', 'page-photo-8');
