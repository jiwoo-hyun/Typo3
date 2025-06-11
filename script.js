// script.js

document.addEventListener("DOMContentLoaded", function () {
    const selectedContainer = document.getElementById("selected-buttons");

    const consonantButtons = document.querySelectorAll(".consonant-buttons button");
    const vowelButtons = document.querySelectorAll(".vowel-buttons button");

    // 자모 → 파일 키 매핑
    const fileMap = {
        'ㄱ': 'ga', 'ㄴ': 'na', 'ㄷ': 'da', 'ㄹ': 'ra', 'ㅁ': 'ma', 'ㅂ': 'ba',
        'ㅅ': 'sa', 'ㅇ': 'ang', 'ㅈ': 'ja', 'ㅊ': 'cha', 'ㅋ': 'ka', 'ㅌ': 'ta', 'ㅍ': 'pa', 'ㅎ': 'ha',
        'ㅏ': 'a', 'ㅑ': 'ya', 'ㅓ': 'eo', 'ㅕ': 'yeo', 'ㅗ': 'o', 'ㅛ': 'yo',
        'ㅜ': 'u', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅣ': 'i', '된소리': 'gga',
        'ㅐ': 'ae', 'ㅒ': 'yae', 'ㅔ': 'e', 'ㅖ': 'ye', 'ㅚ': 'oe', 'ㅟ': 'wi', 'ㅢ': 'ui'
    };

    // 기본 버튼에 frame.svg 설정
    function assignHandGraphic(button) {
        const char = button.textContent;
        const key = fileMap[char];

        button.setAttribute("data-char", char);

        if (key) {
            const defaultImagePath = `images/${key}.frame.svg`;
            /*button.style.backgroundImage = `url('${defaultImagePath}')`;*/
            button.style.backgroundRepeat = 'no-repeat';
            button.style.backgroundSize = '100% 100%';
            button.style.backgroundPosition = 'center';
            button.style.backgroundColor = 'transparent';
            button.style.color = 'black';
        }
    }

    // 선택된 버튼에는 항상 box.svg 적용
    function handleAdd(char) {
        const newBtn = document.createElement("button");
        newBtn.textContent = char;
        newBtn.setAttribute("data-char", char);
        newBtn.classList.add("selected-char");

        const key = fileMap[char];
        if (key) {
            const selectedImagePath = `images/${key}.box.svg`;
            newBtn.style.backgroundImage = `url('${selectedImagePath}')`;
            newBtn.style.backgroundRepeat = 'no-repeat';
            newBtn.style.backgroundSize = '100% 100%';
            newBtn.style.backgroundPosition = 'center';
            newBtn.style.backgroundColor = 'transparent';
            newBtn.style.color = 'black';
        }

        selectedContainer.appendChild(newBtn);
    }

    // 초기 버튼 이미지 적용 및 클릭 이벤트 연결
    consonantButtons.forEach(button => {
        assignHandGraphic(button);
        button.addEventListener("click", () => {
            handleAdd(button.textContent);
        });
    });

    vowelButtons.forEach(button => {
        assignHandGraphic(button);
        button.addEventListener("click", () => {
            handleAdd(button.textContent);
        });
    });

    // 선택 영역에서 버튼 클릭 시 삭제 (저장 모드일 때는 제거 불가)
    selectedContainer.addEventListener("click", (e) => {
        const sectionSelected = document.querySelector(".section-selected");
        const isSaved = sectionSelected.classList.contains("saved");
        if (isSaved) return;

        if (e.target.tagName === "BUTTON" && e.target.classList.contains("selected-char")) {
            e.target.remove();
        }
    });
});

// 스크롤 인터랙션
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("intro-overlay");
    const main = document.querySelector("main");
    const sectionSelected = document.querySelector(".section-selected");
    const sectionButton = document.querySelector(".section-button");
    const selectedButtons = document.getElementById("selected-buttons");

    main.addEventListener("scroll", () => {
        const scrollY = main.scrollTop;
        const hasSelected = selectedButtons.children.length > -1;

        if (scrollY > 50 || hasSelected) {
            overlay.classList.add("hidden");
            sectionSelected.classList.add("visible");
            sectionButton.classList.add("visible");
        } else {
            overlay.classList.remove("hidden");
            sectionSelected.classList.remove("visible");
            sectionButton.classList.remove("visible");
        }
    });
});

// 저장 버튼 생성 및 토글 동작
document.addEventListener("DOMContentLoaded", () => {
    const selectedSection = document.querySelector(".section-selected");
    const selectedButtons = document.getElementById("selected-buttons");

    const saveButton = document.createElement("button");
    saveButton.id = "save-button";
    saveButton.textContent = "저장";
    selectedSection.appendChild(saveButton);

    saveButton.addEventListener("click", () => {
        const sectionButton = document.querySelector(".section-button");
        const sectionSelected = document.querySelector(".section-selected");
    
        const isExpanded = sectionSelected.classList.contains("saved");
    
        if (!isExpanded) {
            sectionButton.style.display = "none";
            sectionSelected.classList.add("saved");
            selectedButtons.classList.add("centered");
            saveButton.classList.add("back");
        } else {
            sectionButton.style.display = "block";
            sectionSelected.classList.remove("saved");
            selectedButtons.classList.remove("centered");
            saveButton.classList.remove("back");
        }
    });
    
    
    // 버튼 존재 여부에 따라 저장 버튼 표시
    const updateSaveButtonVisibility = () => {
        const hasButtons = selectedButtons.querySelectorAll("button").length > 0;
        saveButton.style.display = hasButtons ? "block" : "none";
    };

    updateSaveButtonVisibility();
    const observer = new MutationObserver(updateSaveButtonVisibility);
    observer.observe(selectedButtons, { childList: true });
});

// 드래그 정렬 활성화
document.addEventListener("DOMContentLoaded", () => {
    const selectedButtons = document.getElementById("selected-buttons");

    Sortable.create(selectedButtons, {
        animation: 150,
        ghostClass: 'dragging',
    });
});
