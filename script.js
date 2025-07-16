// DOM 요소 선택
const navBtns = document.querySelectorAll('.nav-btn');
const sessionContents = document.querySelectorAll('.session-content');

// 네비게이션 버튼 클릭 이벤트 리스너 추가
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const sessionNum = btn.getAttribute('data-session');
        
        // 모든 활성 클래스 제거
        navBtns.forEach(b => b.classList.remove('active'));
        sessionContents.forEach(content => content.classList.remove('active'));
        
        // 클릭된 요소에 활성 클래스 추가
        btn.classList.add('active');
        document.getElementById(`session${sessionNum}`).classList.add('active');
    });
});

// 스크롤 애니메이션을 위한 Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // 한 번만 애니메이션 실행
        }
    });
}, observerOptions);

// 모든 '.content-box'에 초기 스타일 설정 및 관찰자 추가
document.querySelectorAll('.content-box, .eval-card').forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(20px)';
    box.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(box);
});

// 상세 정보 버튼 토글 기능
const detailButtons = document.querySelectorAll('.details-btn');

detailButtons.forEach(button => {
    // 링크 버튼은 토글 기능에서 제외
    if (button.tagName.toLowerCase() === 'a') {
        return;
    }

    button.addEventListener('click', () => {
        const targetId = button.dataset.target;
        if (!targetId) return;

        const targetContent = document.getElementById(targetId);
        if (!targetContent) return;

        const wasActive = button.classList.contains('active');
        
        // 현재 버튼이 속한 그룹(li 또는 content-box) 찾기
        const parentContainer = button.closest('.role-play-list > li') || button.closest('.content-box');

        // 그룹 내 모든 버튼과 컨텐츠를 먼저 비활성화/숨김 처리
        if (parentContainer) {
            parentContainer.querySelectorAll('.details-btn').forEach(btn => {
                if (btn.tagName.toLowerCase() !== 'a') {
                    btn.classList.remove('active');
                }
            });
            parentContainer.querySelectorAll('.details-content').forEach(content => {
                content.style.display = 'none';
            });
        }
        
        // 클릭된 버튼이 비활성 상태였을 때만 활성화
        if (!wasActive) {
            button.classList.add('active');
            targetContent.style.display = 'block';
        }
    });
});