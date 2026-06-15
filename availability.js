const statusBar =
    document.querySelector(
        ".status-bar span:last-child"
    );

const hour =
    new Date().getHours();

if (
    hour >= 16 ||
    hour < 2
) {

    statusBar.innerText =
        "Online Nu • Gemiddelde levertijd: 17 min";

} else {

    document.querySelector(
        ".status-dot"
    ).style.background =
        "#ef4444";

    statusBar.innerText =
        "Gesloten • Momenteel niet beschikbaar";
}