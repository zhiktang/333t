// Get DOM elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const loadingScreen = document.querySelector('.loading-screen');

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
                    imagePreview.style.display = 'block';
                    loadingScreen.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }, 1500); // 1.5 second loading simulation
        } else {
            alert('Please upload an image file');
        }
    }
}
