async function displayErrorMessage(message, timed=true) {
    if (!($("#error-popup").length)) {
        let fakeJSX = `<div id="error-popup"><p>${message}</p></div>`;
        $("body").append(fakeJSX);
        let height = $(document).height();
        $("body").append(`<div id='block-screen-error' style="height:${height}px"></div>`);
        if (timed) {
            await sleep(2500);
            $("#error-popup").remove();
            $("#block-screen-error").remove();
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showLive() {
    $('#past-collections').addClass('hidden');
    $('#live-collections').removeClass('hidden');
    if ($("#live-collections .partner-collection").length > 3) {
        $("#scroll-indicator").removeClass("hidden");
    }
    else {
        $("#scroll-indicator").addClass("hidden");
    }
    $("#live-button").addClass("active");
    $("#past-button").removeClass("active");
}

function showPast() {
    $('#live-collections').addClass('hidden');
    $('#past-collections').removeClass('hidden');
    if ($("#past-collections .partner-collection").length > 3) {
        $("#scroll-indicator").removeClass("hidden");
    }
    else {
        $("#scroll-indicator").addClass("hidden");
    }
    $("#past-button").addClass("active");
    $("#live-button").removeClass("active");
}

function showCreate() {
    $('#past-collections').addClass('hidden');
    $('#live-collections').removeClass('hidden');
    if ($("#live-collections .partner-collection").length > 3) {
        $("#scroll-indicator").removeClass("hidden");
    }
    else {
        $("#scroll-indicator").addClass("hidden");
    }
    $("#listing-select-div").addClass('hidden');
    $("#create-button").addClass("active");
    $("#modify-button").removeClass("active");
}

function showModify() {
    $('#live-collections').addClass('hidden');
    $('#past-collections').removeClass('hidden');
    if ($("#past-collections .partner-collection").length > 3) {
        $("#scroll-indicator").removeClass("hidden");
    }
    else {
        $("#scroll-indicator").addClass("hidden");
    }
    $("#listing-select-div").removeClass('hidden');
    $("#modify-button").addClass("active");
    $("#create-button").removeClass("active");
}

function toggleMenu() {
    const el = document.getElementById("mobile-nav-menu")
    el.classList.toggle('expanded')
    el.classList.toggle('collapsed')
 }

 const loadInfuraListings = async() => {
    const listings = await fetch(`API ENDPOINT HERE`).then(res => res.text());
    const jsonData = listings ? JSON.parse(listings) : [];
    $("#live-collections").empty();
    $("#past-collections").empty();
    $("#live-collections").append(jsonData.liveJSX);
    $("#past-collections").append(jsonData.pastJSX);
    $("#num-live").html(`<br>(${jsonData.numLive})`);
    $("#num-past").html(`<br>(${jsonData.numPast})`);
    if (jsonData.numLive > 3 && $("#live-button").hasClass("active")) {
        $("#scroll-indicator").removeClass("hidden");
    }
    else if (jsonData.numPast > 3 && $("#past-button").hasClass("active")) {
        $("#scroll-indicator").removeClass("hidden");
    }
}
