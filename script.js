// Get DOM elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const loadingScreen = document.querySelector('.loading-screen');
const uploadInterface = document.getElementById('uploadInterface');
const previewInterface = document.getElementById('previewInterface');
const newUploadBtn = document.getElementById('newUploadBtn');

// Handle click to upload
dropZone.addEventListener('click', () => {
    fileInput.click();
});

// Handle drag and drop events
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// Handle file input change
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Handle new upload button click
newUploadBtn.addEventListener('click', () => {
    switchToUploadInterface();
});

/**
 * Handles the file upload process
 * @param {FileList} files - The files from the input or drop event
 */
function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            loadingScreen.style.display = 'flex';
            
            // Simulate loading time
            setTimeout(() => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    switchToPreviewInterface();
                    loadingScreen.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }, 1500); // 1.5 second loading simulation
        } else {
            alert('Please upload an image file');
        }
    }
}

/**
 * Switches to the preview interface
 */
function switchToPreviewInterface() {
    uploadInterface.classList.add('hidden');
    previewInterface.classList.remove('hidden');
    // Small delay to trigger the fade-in animation
    setTimeout(() => {
        previewInterface.classList.add('visible');
    }, 50);
}

/**
 * Switches back to the upload interface
 */
function switchToUploadInterface() {
    previewInterface.classList.remove('visible');
    // Wait for fade-out animation to complete
    setTimeout(() => {
        previewInterface.classList.add('hidden');
        uploadInterface.classList.remove('hidden');
        // Clear the file input
        fileInput.value = '';
    }, 300);
}