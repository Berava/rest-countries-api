let darkMode = localStorage.getItem('darkmode');
const darkModeButton = document.getElementById('header__dark-mode-toggle');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'enabled');
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
}

if(darkMode === "enabled") {
    enableDarkMode();
}

darkModeButton.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkmode');
    if(darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});