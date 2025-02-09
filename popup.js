document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Tab Switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const contentId = tab.getAttribute('data-tab');
            document.getElementById(contentId).classList.add('active');
        });
    });

    // Record Button
    const recordButton = document.querySelector('.record-button');
    const recordStatus = recordButton.nextElementSibling;
    let isRecording = false;

    recordButton.addEventListener('click', async () => {
        isRecording = !isRecording;
        recordButton.classList.toggle('recording');
        recordStatus.textContent = isRecording ? 'Recording in progress...' : 'Start recording';

        if (!isRecording) {
            chrome.runtime.sendMessage({ action: "startTranscription" }, (response) => {
                alert(response.message);
            });
        }
    });

    // Summarize Button
    const summarizeButton = document.querySelector('.primary-button');
    const textarea = document.querySelector('textarea');

    summarizeButton.addEventListener('click', async () => {
        summarizeButton.disabled = true;
        summarizeButton.textContent = 'Summarizing...';

        try {
            const response = await fetch('http://127.0.0.1:5000/summary');
            const data = await response.json();

            if (data.summary) {
                textarea.value = data.summary;
            } else {
                textarea.value = "No summary available.";
            }
        } catch (error) {
            console.error('Failed to fetch summary:', error);
            textarea.value = "Error fetching summary.";
        } finally {
            summarizeButton.disabled = false;
            summarizeButton.textContent = 'Summarize Meeting';
        }
    });

    // Utility Buttons
    const copyButton = document.querySelector('[title="Copy"]');
    const downloadButton = document.querySelector('[title="Download"]');
    const shareButton = document.querySelector('[title="Share"]');

    copyButton.addEventListener('click', () => {
        if (textarea.value) {
            navigator.clipboard.writeText(textarea.value)
                .then(() => alert('Summary copied to clipboard!'))
                .catch(err => console.error('Failed to copy text:', err));
        }
    });

    downloadButton.addEventListener('click', () => {
        if (textarea.value) {
            const blob = new Blob([textarea.value], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'meeting-summary.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    });

    shareButton.addEventListener('click', async () => {
        if (textarea.value) {
            try {
                await navigator.share({
                    title: 'Meeting Summary',
                    text: textarea.value
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        }
    });
});
