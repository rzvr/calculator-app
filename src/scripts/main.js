const ROOT_ELEMENT = document.documentElement;
const THEME_SWITCHER = document.querySelector('.theme-switcher__body');
const THEME_BUTTONS = document.querySelectorAll('.theme-switcher__button');
const THEME_SLIDER = document.querySelector('.theme-switcher__slider');
const DISPLAY = document.querySelector('.calc__display');
const KEYPAD = document.querySelector('.calc__keypad');

let themes = {
    1: 'neutral',
    2: 'light',
    3: 'dark'
}

let specialCharacters = ['.', '+', '-', '*', '/'];




if (sessionStorage.getItem('theme') == null) {
    let checkedButtonPosition = getCheckedButton(THEME_BUTTONS).dataset.themeNumber;
    sessionStorage.setItem('theme', checkedButtonPosition);
}

switchTheme();

THEME_SWITCHER.addEventListener('click', event => {
    if (event.target.type !== 'radio') return;

    let themeNumber = event.target.dataset.themeNumber;

    sessionStorage.setItem('theme', themeNumber);
    switchTheme();
});


KEYPAD.addEventListener('click', event => {
    const KEY = event.target;
    const KEY_TYPE = KEY.dataset.type;
    const KEY_VALUE = event.target.textContent;
    const DISPLAY_TEXT = DISPLAY.textContent;

    if (event.target.classList.contains('calc__keypad')) return;

    if (KEY_TYPE === 'delete') {
        if (DISPLAY_TEXT == '0') return;

        deleteLastCharacter();

        if (!DISPLAY.innerText) renderInitialZeroOnDisplay();
        return;
    };

    if (KEY_TYPE === 'reset') {
        cleanDisplay();
        renderInitialZeroOnDisplay();
        return;
    };

    if (KEY_TYPE === 'equal') {
        if (DISPLAY_TEXT == '0') return;

        let result = calculateExpression(DISPLAY_TEXT);
        renderResultOfExpression(result);
        return;
    };

    if (DISPLAY_TEXT.length > 10) return;

    if (DISPLAY_TEXT == '0') cleanDisplay();

    if (DISPLAY_TEXT == '0' && KEY_VALUE == '-') {
        cleanDisplay();
        renderCharacter(KEY_VALUE);
        return;
    }

    if (DISPLAY_TEXT == '0' && KEY_VALUE == '.') {
        renderCharacter(0);
        renderCharacter(KEY_VALUE);
        return;
    }

    if (KEY_VALUE == '.') {
        let renderedText = DISPLAY.textContent.split('');
        let filteredCharasters = renderedText.filter(character => !Number.isInteger(+character));

        if (filteredCharasters[filteredCharasters.length - 1] == '.') return;
    }

    if (specialCharacters.find(char => char === KEY_VALUE)) {
        if (!DISPLAY_TEXT || DISPLAY_TEXT == '0') {
            renderInitialZeroOnDisplay();
            return;
        }

        let allRenderedCharacters = DISPLAY.innerText.split('');
        let lastRenderedCharacter = allRenderedCharacters[allRenderedCharacters.length - 1];

        if (Number.isInteger(+lastRenderedCharacter)) {
            renderCharacter(KEY_VALUE);
            return;
        };

        deleteLastCharacter();
        renderCharacter(KEY_VALUE);
        return;
    }

    renderCharacter(KEY_VALUE);
});


window.addEventListener('keydown', event => {
    const KEY = event.key;
    const DISPLAY_TEXT = DISPLAY.textContent;

    if (KEY === '/') event.preventDefault();

    if (KEY === 'Backspace') {
        if (DISPLAY_TEXT == '0') return;

        deleteLastCharacter();

        if (!DISPLAY.innerText) renderInitialZeroOnDisplay();
    }

    if (KEY === '=' || KEY === 'Enter') {
        if (DISPLAY_TEXT == '0') return;

        let result = calculateExpression(DISPLAY_TEXT);
        renderResultOfExpression(result);
    };

    if (DISPLAY_TEXT.length > 10) return;

    if (DISPLAY_TEXT == '0' && KEY == '-') {
        cleanDisplay();
        renderCharacter(KEY);
        return;
    }

    if (DISPLAY_TEXT == '0' && KEY == '.') {
        renderCharacter(KEY);
    }

    if (KEY == '.') {
        let renderedText = DISPLAY.textContent.split('');
        let filteredCharasters = renderedText.filter(character => !Number.isInteger(+character));

        if (filteredCharasters[filteredCharasters.length - 1] == '.') return;
    }

    if (specialCharacters.find(char => char === KEY)) {
        let allRenderedCharacters = DISPLAY.innerText.split('');
        let lastRenderedCharacter = allRenderedCharacters[allRenderedCharacters.length - 1];

        if (Number.isInteger(+lastRenderedCharacter)) {
            renderCharacter(KEY);
            return;
        };

        deleteLastCharacter();
        renderCharacter(KEY);
    }

    if (Number.isInteger(+KEY)) {
        if (DISPLAY_TEXT == '0') cleanDisplay();
        renderCharacter(KEY);
    }
});



function moveSlider(position) {
    let sliderPositions = {
        1: '7%',
        2: '39%',
        3: '70%'
    }

    THEME_SLIDER.style.left = sliderPositions[position];
}

function getCheckedButton(buttons) {
    if (!Array.isArray(buttons)) {
        buttons = Array.from(buttons);
    }

    return buttons.find(button => button.checked);
}

function switchTheme() {
    let themeButtons = Array.from(THEME_BUTTONS);

    ROOT_ELEMENT.setAttribute('data-theme', themes[sessionStorage.getItem('theme')]);

    themeButtons.forEach(button => {
        let themeButtonPosition = button.dataset.themeNumber;
        let сurrentNumberOfAppliedTheme = sessionStorage.getItem('theme');

        if (сurrentNumberOfAppliedTheme == themeButtonPosition) button.setAttribute('checked', true);
    });

    moveSlider(sessionStorage.getItem('theme'));
}

function renderInitialZeroOnDisplay() {
    DISPLAY.textContent = 0;
}

function deleteLastCharacter() {
    DISPLAY.textContent = DISPLAY.textContent.substr(0, DISPLAY.textContent.length - 1);
}

function cleanDisplay() {
    DISPLAY.textContent = '';
}

function renderCharacter(character) {
    DISPLAY.textContent += character;
}

function calculateExpression(expression) {
    return eval(expression);
}

function renderResultOfExpression(result) {
    DISPLAY.textContent = +result.toFixed(2);
}