const SLIDER=document.querySelector(".slider"),ROOT_ELEMENT=document.documentElement,CALC_DISPLAY=document.querySelector(".calc__display"),CALC_BODY=document.querySelector(".calc__body");let themes={1:"neutral",2:"light",3:"dark"};function switchTheme(){ROOT_ELEMENT.setAttribute("data-theme",themes[sessionStorage.getItem("theme")]),SLIDER.value=sessionStorage.getItem("theme")}function renderInitialZeroOnDisplay(){CALC_DISPLAY.innerText=0}function deleteLastCharacter(){CALC_DISPLAY.innerText=CALC_DISPLAY.innerText.substr(0,CALC_DISPLAY.innerText.length-1)}function cleanDisplay(){CALC_DISPLAY.innerText=""}function characterIsOperator(t){return["+","-","*","/"].some(e=>e==t)}function renderCharacterOnDisplay(e){CALC_DISPLAY.innerText+=e}function renderExpressionResultOnDisplay(e){CALC_DISPLAY.innerText=+e.toFixed(2)}null==sessionStorage.getItem("theme")&&sessionStorage.setItem("theme",SLIDER.value),switchTheme(),SLIDER.addEventListener("change",()=>{sessionStorage.setItem("theme",SLIDER.value),switchTheme()}),CALC_BODY.addEventListener("click",event=>{const KEY_VALUE=event.target.innerText;if(!event.target.classList.contains("calc__body")){if("DEL"===KEY_VALUE)return 0==CALC_DISPLAY.innerText?void 0:(deleteLastCharacter(),void(CALC_DISPLAY.innerText||renderInitialZeroOnDisplay()));if("RESET"===KEY_VALUE)return cleanDisplay(),void renderInitialZeroOnDisplay();if("="!==KEY_VALUE){if(!(10<CALC_DISPLAY.innerText.length)){0==CALC_DISPLAY.innerText&&cleanDisplay();let renderedCharacters=CALC_DISPLAY.innerText.split(""),lastWellBeCheckedCharacter=renderedCharacters[renderedCharacters.length-1],isLastRenderedCharacterOperator=characterIsOperator(lastWellBeCheckedCharacter),isRecentlyCharacterOperator=characterIsOperator(KEY_VALUE);isLastRenderedCharacterOperator&&isRecentlyCharacterOperator||renderCharacterOnDisplay(KEY_VALUE)}}else{if(0==CALC_DISPLAY.innerText)return;const EXPRESSION=CALC_DISPLAY.innerText;let result=eval(EXPRESSION);renderExpressionResultOnDisplay(result)}}});