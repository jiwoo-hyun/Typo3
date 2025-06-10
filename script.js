// script.js

// 자음 모음 로직
document.addEventListener("DOMContentLoaded", function () {
    const selectedContainer = document.getElementById("selected-buttons");

    // 자음 버튼들만 선택
    const consonantButtons = document.querySelectorAll(".consonant-buttons button");

    // 모음 버튼들만 선택
    const vowelButtons = document.querySelectorAll(".vowel-buttons button");

    // 공통 처리 함수
    function handleAdd(char) {
        const newBtn = document.createElement("button");
        newBtn.textContent = char;
        newBtn.setAttribute("data-char", char);
        newBtn.classList.add("selected-char");

        selectedContainer.appendChild(newBtn);
    }

    // 자음 버튼 클릭 → 추가
    consonantButtons.forEach(button => {
        button.addEventListener("click", () => {
            handleAdd(button.textContent);
        });
    });

    // 모음 버튼 클릭 → 추가
    vowelButtons.forEach(button => {
        button.addEventListener("click", () => {
            handleAdd(button.textContent);
        });
    });

    // selected 영역의 버튼 클릭 시 삭제 (저장모드일 때는 제거 불가)
    selectedContainer.addEventListener("click", (e) => {
        const isSaved = document.querySelector(".section-selected").classList.contains("saved");
        if (isSaved) return;

        if (e.target.tagName === "BUTTON" && e.target.classList.contains("selected-char")) {
            e.target.remove();
        }
    });
});




// 스크롤 로직
document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("intro-overlay");
    const main = document.querySelector("main");
    const sectionSelected = document.querySelector(".section-selected");
    const sectionButton = document.querySelector(".section-button");
    const selectedButtons = document.getElementById("selected-buttons");

    main.addEventListener("scroll", () => {
        const scrollY = main.scrollTop;
        const hasSelected = selectedButtons.children.length > -1; // 선택된 버튼이 있는지

        if (scrollY > 50 || hasSelected ) {
            overlay.classList.add("hidden");

            // section-selected 고정된 채 나타남
            sectionSelected.classList.add("visible");

            // section-button은 애니메이션으로 등장
            sectionButton.classList.add("visible");
        } else {
            overlay.classList.remove("hidden");

            sectionSelected.classList.remove("visible");
            sectionButton.classList.remove("visible");
        }
    });
});

// 저장 버튼 로직
document.addEventListener("DOMContentLoaded", () => {
    const selectedSection = document.querySelector(".section-selected");
    const selectedButtons = document.getElementById("selected-buttons");

    // "전환" 버튼 생성
    const saveButton = document.createElement("button");
    saveButton.id = "save-button";
    saveButton.textContent = "저장";
    selectedSection.appendChild(saveButton)
    // 버튼 클릭 시 동작
    // 저장 버튼 클릭 시
    saveButton.addEventListener("click", () => {
        const sectionButton = document.querySelector(".section-button");
        const sectionSelected = document.querySelector(".section-selected");
        const selectedButtons = document.getElementById("selected-buttons");

        const isExpanded = sectionSelected.classList.contains("saved");

        if (!isExpanded) {
            // ➕ 전환 모드 진입
            sectionButton.style.display = "none";
            sectionSelected.classList.add("saved");
            selectedButtons.classList.add("centered");
            saveButton.textContent = "돌아가기";
            saveButton.classList.add("back"); // 전환될 때
        } else {
            // 🔙 원래 모드로 복귀
            sectionButton.style.display = "block";
            sectionSelected.classList.remove("saved");
            selectedButtons.classList.remove("centered");
            saveButton.textContent = "저장";
            saveButton.classList.remove("back"); // 되돌릴 때
        }
    });


    // 버튼이 하나라도 있으면 표시
    const updateSaveButtonVisibility = () => {
        const hasButtons = selectedButtons.querySelectorAll("button").length > 0;
        saveButton.style.display = hasButtons ? "block" : "none";
    };

    // 초기 체크
    updateSaveButtonVisibility();

    // 나중에 버튼 추가될 때도 감지
    const observer = new MutationObserver(updateSaveButtonVisibility);
    observer.observe(selectedButtons, { childList: true });
});

// 드래그 로직
document.addEventListener("DOMContentLoaded", () => {
    const selectedButtons = document.getElementById("selected-buttons");

    // 드래그 정렬 활성화
    Sortable.create(selectedButtons, {
        animation: 150,
        ghostClass: 'dragging', // 드래그 중인 요소에 클래스 부여 (스타일 줄 수 있음)
    });
});





