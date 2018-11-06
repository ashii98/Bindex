const page = {
    form: `<div class="uk-animation-slide-top-small">
                <h1 style="color: #fff"> Hello New Guy, What's Your Name?</h1>
                <div class="uk-margin uk-width-1-1">
                    <div class="uk-inline uk-width-1-1">
                        <span class="uk-form-icon" uk-icon="icon: user"></span>
                        <input id="uesrname" class="uk-input uk-form-large" type="text" placeholder="Type and press enter...">
                    </div>
                </div>
            </div>`,
    main: `<div class="uk-animation-slide-top-small uk-text-center">
                <h1 class="big-title time"></h1>
                <h1 class="date uk-text-center" style="margin-top:-20px"></h1>
                <div class="uk-margin uk-width-1-1">
                    <div class="uk-inline uk-width-1-1">
                        <span class="uk-form-icon" uk-icon="icon: search"></span>
                        <input id="search" class="uk-input uk-form-large" type="text" placeholder="Search Anything...">
                    </div>
                </div>
            </div>`,
}
let wallpaper;
$(document).ready(function () {
    const username = Cookies.get('username');
    setTimeout(function(){$('#search').focus()},500)
    $.ajax({
        url: 'https://api.unsplash.com/photos/random/',
        type: 'GET',
        data: {
            client_id: 'd3482ac74e38aa25c6a6bf86a75d0e11ed797a97644619e3e19e01a571b4ea33',
            query: 'mountain'
        },
        success: function (data) {
            $('#background').append('<img id="background" src="' + data.urls.regular + '" height="100%" width="100%" alt="main background">')
            wallpaper = data.links.download;
        },
        error: function () {
            const background_random = Math.floor(Math.random() * 2) + 1;
            $('#background').append('<img id="background" src="./img/' + background_random + '.jpg" height="100%" width="100%" alt="main background">')
        }
    })
    if(username != undefined)
        get_uesr_info();
    else
        $('#app').append(page.form)
    $('.date').text(moment().format('dddd ll'))

});

$(document).on('keypress', '#uesrname', function (e) {
    if(e.keyCode == 13){
        Cookies.set('username', e.target.value, { expires: 365 })
        get_uesr_info()
    }
})
// download 
$(document).on('click', '#download_btn', function () {
    window.open(wallpaper);
})
// search
$(document).on('keypress', '#search', function (e) {
    if(e.keyCode == 13 && e.target.value != ""){
        window.location.href = 'https://www.google.com/search?q=' + e.target.value;
    }
})

function get_uesr_info() {
    $('#app').empty();
    $('#app').append(page.main);
    $('#app').after(`<div class="uk-position-bottom-right">
                        <button id="setting" class="uk-button uk-button-default"><span style="color: #fff;" uk-icon="icon: cog; ratio: 1.7"></span></button>
                        <div uk-dropdown="pos: top-left; mode: click">
                            <ul class="uk-nav uk-dropdown-nav">
                                <li><a id="delete_user_data">Delete User Data</a></li>
                            </ul>
                        </div>
                    </div>`)
    // $('.name').text('Hi ' + Cookies.get('username'))
    document.title = 'Hi ' + Cookies.get('username');
    get_current_time();
}

function get_current_time() {
    $('.time').html(moment().format('LT'))
    setInterval(function () {
        $('.time').html(moment().format('LT'))
    }, 1000)
}

$(document).on('click', '#delete_user_data', function () {
    Cookies.remove('username');
    window.location.reload();
})