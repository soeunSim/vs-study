const accordionData = [
    {
        title: "아코디언은 무엇인가요?",
        content: "FAQ, 모바일 메뉴에 자주 사용합니다.",
    },
    {
        title: "어떤 경우에 사용하나요?",
        content: "FAQ, 모바일 메뉴에 자주 사용합니다.",
    },
    {
        title: "어떻게 구현하나요?",
        content:
            "JS의 classList 문법을 사용해 css class를 활용하여 toggle 이벤트를 등록하면 됩니다.",
    },
];

document.addEventListener("DOMContentLoaded", () => {
    const accordion = new Accordion(".js-accordion", accordionData);
    console.log(accordion);
});