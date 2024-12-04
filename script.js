// Get DOM elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const imagePreview1 = document.getElementById('imagePreview1');
const imagePreview2 = document.getElementById('imagePreview2');
const loadingScreen = document.querySelector('.loading-screen');
const uploadInterface = document.getElementById('uploadInterface');
const previewInterface = document.getElementById('previewInterface');
const newUploadBtn = document.getElementById('newUploadBtn');
const saveBtn = document.getElementById('saveBtn');

// Store the original filename
let originalFilename = '';

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

// Handle save button click
saveBtn.addEventListener('click', () => {
    downloadImage(imagePreview1.src);
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
            // Store the original filename
            originalFilename = file.name;
            
            // Simulate loading time
            setTimeout(() => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Set the same image source for both preview elements
                    imagePreview1.src = e.target.result;
                    imagePreview2.src = e.target.result;
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
 * Downloads the image
 * @param {string} imageUrl - The data URL of the image
 */
function downloadImage(imageUrl) {
    const link = document.createElement('a');
    
    // Get file extension from original filename or default to .png
    const fileExtension = originalFilename ? `.${originalFilename.split('.').pop()}` : '.png';
    const filename = `image_${Date.now()}${fileExtension}`;
    
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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