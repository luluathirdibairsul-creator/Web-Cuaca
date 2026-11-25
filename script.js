document.addEventListener("DOMContentLoaded", function () {

    function el(id) {
        return document.getElementById(id);
    }


    function updateClock() {

        const now = new Date();

        const dateElement = el("currentDate");
        const timeElement = el("currentTime");

        if (dateElement) {

            dateElement.textContent =
                new Intl.DateTimeFormat(
                    "id-ID",
                    {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                ).format(now);

        }


        if (timeElement) {

            timeElement.textContent =
                new Intl.DateTimeFormat(
                    "id-ID",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false
                    }
                )
                .format(now)
                .replace(/\./g, ":");

        }

    }


    updateClock();

    setInterval(
        updateClock,
        1000
    );

    const navbarToggle =
        el("navbarToggle");

    const navbarMenu =
        el("navbarMenu");


    if (
        navbarToggle &&
        navbarMenu
    ) {

        navbarToggle.addEventListener(
            "click",
            function () {

                navbarMenu.classList.toggle(
                    "open"
                );


                const icon =
                    navbarToggle.querySelector(
                        "i"
                    );


                if (icon) {

                    if (
                        navbarMenu.classList.contains(
                            "open"
                        )
                    ) {

                        icon.className =
                            "fa-solid fa-xmark";

                    }

                    else {

                        icon.className =
                            "fa-solid fa-bars";

                    }

                }

            }
        );

    }


    document
        .querySelectorAll(
            ".nav-link-custom"
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        if (navbarMenu) {

                            navbarMenu.classList.remove(
                                "open"
                            );

                        }


                        if (navbarToggle) {

                            const icon =
                                navbarToggle.querySelector(
                                    "i"
                                );


                            if (icon) {

                                icon.className =
                                    "fa-solid fa-bars";

                            }

                        }

                    }
                );

            }
        );


    const darkModeBtn =
        el("darkModeBtn");


    if (darkModeBtn) {

        darkModeBtn.addEventListener(
            "click",
            function () {

                document.body
                    .classList
                    .toggle(
                        "dark-mode"
                    );


                const icon =
                    darkModeBtn.querySelector(
                        "i"
                    );


                if (
                    document.body
                        .classList
                        .contains(
                            "dark-mode"
                        )
                ) {

                    icon.className =
                        "fa-solid fa-sun";

                }

                else {

                    icon.className =
                        "fa-solid fa-moon";

                }

            }
        );

    }

    const faqQuestions =
        document.querySelectorAll(
            ".faq-question"
        );


    function closeFAQ() {

        faqQuestions.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );


                const answer =
                    button.nextElementSibling;


                if (answer) {

                    answer.classList.remove(
                        "open"
                    );

                    answer.style.maxHeight =
                        null;

                }

            }
        );

    }


    faqQuestions.forEach(
        function (button) {

            const answer =
                button.nextElementSibling;


            if (
                button.classList.contains(
                    "active"
                ) &&
                answer
            ) {

                answer.style.maxHeight =
                    answer.scrollHeight +
                    "px";

            }


            button.addEventListener(
                "click",
                function () {

                    const isActive =
                        button.classList.contains(
                            "active"
                        );


                    closeFAQ();


                    if (!isActive) {

                        button.classList.add(
                            "active"
                        );


                        if (answer) {

                            answer.classList.add(
                                "open"
                            );

                            answer.style.maxHeight =
                                answer.scrollHeight +
                                "px";

                        }

                    }

                }
            );

        }
    );

    function weatherInfo(code) {

        const weatherData = {

            0: [
                "Cerah",
                "fa-sun"
            ],

            1: [
                "Cerah",
                "fa-sun"
            ],

            2: [
                "Cerah Berawan",
                "fa-cloud-sun"
            ],

            3: [
                "Berawan",
                "fa-cloud"
            ],

            45: [
                "Berkabut",
                "fa-smog"
            ],

            48: [
                "Berkabut",
                "fa-smog"
            ],

            51: [
                "Gerimis",
                "fa-cloud-rain"
            ],

            53: [
                "Gerimis",
                "fa-cloud-rain"
            ],

            55: [
                "Gerimis",
                "fa-cloud-rain"
            ],

            61: [
                "Hujan Ringan",
                "fa-cloud-rain"
            ],

            63: [
                "Hujan Sedang",
                "fa-cloud-rain"
            ],

            65: [
                "Hujan Lebat",
                "fa-cloud-showers-heavy"
            ],

            80: [
                "Hujan Ringan",
                "fa-cloud-rain"
            ],

            81: [
                "Hujan Sedang",
                "fa-cloud-rain"
            ],

            82: [
                "Hujan Lebat",
                "fa-cloud-showers-heavy"
            ],

            95: [
                "Badai Petir",
                "fa-cloud-bolt"
            ],

            96: [
                "Badai Petir",
                "fa-cloud-bolt"
            ],

            99: [
                "Badai Petir",
                "fa-cloud-bolt"
            ]

        };


        const result =
            weatherData[
                Number(code)
            ] ||
            [
                "Tidak Diketahui",
                "fa-cloud"
            ];


        return {

            text:
                result[0],

            icon:
                result[1]

        };

    }

    function getWindDirection(degree) {

        const directions = [

            "Utara",

            "Timur Laut",

            "Timur",

            "Tenggara",

            "Selatan",

            "Barat Daya",

            "Barat",

            "Barat Laut"

        ];


        const index =
            Math.round(
                Number(degree) /
                45
            ) % 8;


        return directions[index];

    }

    function buildLocationName(location) {

        const items = [];


        [
            location.name,
            location.admin4,
            location.admin3,
            location.admin2,
            location.admin1
        ]
        .forEach(
            function (item) {

                if (
                    item &&
                    !items.includes(item)
                ) {

                    items.push(item);

                }

            }
        );


        return items.join(", ");

    }

    async function searchOpenMeteo(query) {

        try {

            const url =
                "https://geocoding-api.open-meteo.com/v1/search" +
                "?name=" +
                encodeURIComponent(query) +
                "&count=20" +
                "&language=id" +
                "&format=json";


            const response =
                await fetch(url);


            if (!response.ok) {

                return null;

            }


            const data =
                await response.json();


            if (
                !data.results ||
                !data.results.length
            ) {

                return null;

            }


            let result =
                data.results.find(
                    function (item) {

                        return (
                            item.country_code ===
                            "ID"
                        );

                    }
                );


            if (!result) {

                result =
                    data.results[0];

            }


            return {

                name:
                    result.name,

                admin1:
                    result.admin1 || "",

                admin2:
                    result.admin2 || "",

                admin3:
                    result.admin3 || "",

                admin4:
                    result.admin4 || "",

                latitude:
                    Number(
                        result.latitude
                    ),

                longitude:
                    Number(
                        result.longitude
                    )

            };

        }

        catch (error) {

            console.log(
                "Geocoding error:",
                error
            );

            return null;

        }

    }

    async function searchOSM(query) {

        try {

            const url =
                "https://nominatim.openstreetmap.org/search" +
                "?format=jsonv2" +
                "&addressdetails=1" +
                "&countrycodes=id" +
                "&limit=5" +
                "&accept-language=id" +
                "&q=" +
                encodeURIComponent(
                    query +
                    ", Indonesia"
                );


            const response =
                await fetch(url);


            if (!response.ok) {

                return null;

            }


            const data =
                await response.json();


            if (
                !data ||
                !data.length
            ) {

                return null;

            }


            const item =
                data[0];


            const address =
                item.address || {};


            return {

                name:
                    address.village ||
                    address.hamlet ||
                    address.suburb ||
                    address.town ||
                    address.city ||
                    item.name ||
                    query,

                admin1:
                    address.state ||
                    "",

                admin2:
                    address.regency ||
                    address.county ||
                    "",

                admin3:
                    address.district ||
                    "",

                admin4:
                    address.village ||
                    "",

                latitude:
                    Number(
                        item.lat
                    ),

                longitude:
                    Number(
                        item.lon
                    )

            };

        }

        catch (error) {

            console.log(
                "OSM error:",
                error
            );

            return null;

        }

    }

    async function getCoordinates(query) {

        let location =
            await searchOpenMeteo(
                query
            );


        if (!location) {

            location =
                await searchOSM(
                    query
                );

        }


        if (!location) {

            throw new Error(
                "Wilayah tidak ditemukan."
            );

        }


        return location;

    }

    async function getWeather(
        latitude,
        longitude
    ) {

        const url =
            "https://api.open-meteo.com/v1/forecast" +

            "?latitude=" +
            latitude +

            "&longitude=" +
            longitude +

            "&current=" +
            "temperature_2m," +
            "relative_humidity_2m," +
            "apparent_temperature," +
            "precipitation," +
            "rain," +
            "weather_code," +
            "cloud_cover," +
            "pressure_msl," +
            "wind_speed_10m," +
            "wind_direction_10m" +

            "&daily=" +
            "weather_code," +
            "temperature_2m_max," +
            "temperature_2m_min," +
            "precipitation_probability_max," +
            "wind_speed_10m_max" +

            "&timezone=auto" +

            "&forecast_days=5";


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Data cuaca gagal dimuat."
            );

        }


        return await response.json();

    }

    let currentMapType =
        "road";

    let currentLatitude =
        null;

    let currentLongitude =
        null;

    let currentMapName =
        "Indonesia";


    function updateMap() {

        const map =
            el("googleMap");


        if (!map) return;


        const mapType =
            currentMapType ===
            "satellite"
                ? "k"
                : "m";


        if (
            currentLatitude !==
            null &&
            currentLongitude !==
            null
        ) {

            map.src =
                "https://maps.google.com/maps?q=" +
                currentLatitude +
                "," +
                currentLongitude +
                "&t=" +
                mapType +
                "&z=11&output=embed";

        }

        else {

            map.src =
                "https://maps.google.com/maps?q=Indonesia&t=" +
                mapType +
                "&z=5&output=embed";

        }


        const mapName =
            el(
                "mapDetectedName"
            );


        if (mapName) {

            mapName.textContent =
                currentMapName;

        }

    }


    function updateLocationMap(location) {

        currentLatitude =
            location.latitude;

        currentLongitude =
            location.longitude;

        currentMapName =
            buildLocationName(
                location
            );


        updateMap();

    }


    document
        .querySelectorAll(
            ".map-type-button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        document
                            .querySelectorAll(
                                ".map-type-button"
                            )
                            .forEach(
                                function (item) {

                                    item.classList.remove(
                                        "active"
                                    );

                                }
                            );


                        button.classList.add(
                            "active"
                        );


                        currentMapType =
                            button.dataset.mapType;


                        updateMap();

                    }
                );

            }
        );

    function displayCurrent(
        location,
        data
    ) {

        const current =
            data.current;


        const info =
            weatherInfo(
                current.weather_code
            );


        const locationName =
            buildLocationName(
                location
            );


        if (el("currentCity")) {

            el("currentCity").textContent =
                location.name;

        }


        if (el("currentCondition")) {

            el("currentCondition").textContent =
                info.text;

        }


        if (el("currentTemperature")) {

            el("currentTemperature").textContent =
                Math.round(
                    current.temperature_2m
                ) +
                "°C";

        }


        if (el("currentFeels")) {

            el("currentFeels").textContent =
                Math.round(
                    current.apparent_temperature
                ) +
                "°C";

        }


        if (el("currentHumidity")) {

            el("currentHumidity").textContent =
                current.relative_humidity_2m +
                "%";

        }


        if (el("currentWind")) {

            el("currentWind").textContent =
                Math.round(
                    current.wind_speed_10m
                ) +
                " km/j";

        }


        if (el("currentRain")) {

            el("currentRain").textContent =
                (
                    current.rain ??
                    current.precipitation ??
                    0
                ) +
                " mm";

        }


        if (el("currentIcon")) {

            el("currentIcon").className =
                "fa-solid " +
                info.icon +
                " hero-weather-icon";

        }


        if (el("currentWeatherLocation")) {

            el("currentWeatherLocation").textContent =
                "Kondisi cuaca terbaru " +
                locationName;

        }


        if (el("detailTemp")) {

            el("detailTemp").textContent =
                Math.round(
                    current.temperature_2m
                ) +
                "°C";

        }


        if (el("detailFeels")) {

            el("detailFeels").textContent =
                Math.round(
                    current.apparent_temperature
                ) +
                "°C";

        }


        if (el("detailHumidity")) {

            el("detailHumidity").textContent =
                current.relative_humidity_2m +
                "%";

        }


        if (el("detailWind")) {

            el("detailWind").textContent =
                Math.round(
                    current.wind_speed_10m
                ) +
                " km/j";

        }


        if (el("detailRain")) {

            el("detailRain").textContent =
                (
                    current.precipitation ??
                    0
                ) +
                " mm";

        }


        if (el("detailCloud")) {

            el("detailCloud").textContent =
                current.cloud_cover +
                "%";

        }


        if (el("detailPressure")) {

            el("detailPressure").textContent =
                Math.round(
                    current.pressure_msl
                ) +
                " hPa";

        }


        if (el("detailWindDirection")) {

            el("detailWindDirection").textContent =
                getWindDirection(
                    current.wind_direction_10m
                );

        }


        if (el("detectedLocationName")) {

            el("detectedLocationName").textContent =
                locationName;

        }


        if (el("detectedLocationDetail")) {

            el("detectedLocationDetail").textContent =
                location.latitude.toFixed(4) +
                ", " +
                location.longitude.toFixed(4);

        }


        if (el("lastUpdated")) {

            el("lastUpdated").textContent =
                "Diperbarui " +
                new Date()
                    .toLocaleTimeString(
                        "id-ID",
                        {
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );

        }

    }

    function displayForecast(
        location,
        data
    ) {

        const container =
            el(
                "forecastContainer"
            );


        if (!container) return;


        container.innerHTML =
            "";


        if (el("forecastLocation")) {

            el("forecastLocation").textContent =
                "Prakiraan cuaca " +
                buildLocationName(
                    location
                );

        }


        data.daily.time.forEach(
            function (
                date,
                index
            ) {

                const info =
                    weatherInfo(
                        data.daily
                            .weather_code[index]
                    );


                const day =
                    new Date(
                        date +
                        "T00:00:00"
                    );


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "forecast-card";


                const dayName =
                    index === 0
                        ? "Hari Ini"
                        : day.toLocaleDateString(
                            "id-ID",
                            {
                                weekday:
                                    "long"
                            }
                        );


                const maxTemp =
                    Math.round(
                        data.daily
                            .temperature_2m_max[index]
                    );


                const minTemp =
                    Math.round(
                        data.daily
                            .temperature_2m_min[index]
                    );


                const rain =
                    data.daily
                        .precipitation_probability_max[index] ??
                    0;


                const wind =
                    Math.round(
                        data.daily
                            .wind_speed_10m_max[index]
                    );


                card.innerHTML =
                    `

                    <strong>
                        ${dayName}
                    </strong>

                    <div class="forecast-main-icon">

                        <i class="fa-solid ${info.icon}"></i>

                    </div>

                    <h4>
                        ${info.text}
                    </h4>

                    <h3>
                        ${maxTemp}°C
                    </h3>

                    <div class="forecast-information">

                        <div>
                            Min:
                            ${minTemp}°C
                        </div>

                        <div>
                            Hujan:
                            ${rain}%
                        </div>

                        <div>
                            Angin:
                            ${wind} km/j
                        </div>

                    </div>

                    `;


                container.appendChild(
                    card
                );

            }
        );

    }

    const citySearch =
        el("citySearch");

    const searchWeatherBtn =
        el("searchWeatherBtn");

    const searchMessage =
        el("searchMessage");


    async function loadCity(city) {

        try {

            if (searchMessage) {

                searchMessage.textContent =
                    "Mencari wilayah...";

            }


            const location =
                await getCoordinates(
                    city
                );


            const weather =
                await getWeather(
                    location.latitude,
                    location.longitude
                );


            displayCurrent(
                location,
                weather
            );


            displayForecast(
                location,
                weather
            );


            updateLocationMap(
                location
            );


            if (searchMessage) {

                searchMessage.textContent =
                    "Cuaca " +
                    buildLocationName(
                        location
                    ) +
                    " berhasil ditampilkan.";

            }

        }

        catch (error) {

            console.log(error);


            if (searchMessage) {

                searchMessage.textContent =
                    error.message ||
                    "Data gagal dimuat.";

            }

        }

    }

    function runSearch() {

        if (!citySearch) return;


        const value =
            citySearch.value.trim();


        if (!value) {

            if (searchMessage) {

                searchMessage.textContent =
                    "Masukkan nama wilayah.";

            }

            return;

        }


        loadCity(
            value
        );

    }


    if (searchWeatherBtn) {

        searchWeatherBtn.addEventListener(
            "click",
            runSearch
        );

    }


    if (citySearch) {

        citySearch.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    runSearch();

                }

            }
        );

    }

    const cities = [

        "Jakarta",

        "Surabaya",

        "Bandung",

        "Medan",

        "Makassar"

    ];


    async function loadCities() {

        const container =
            el(
                "cityContainer"
            );


        if (!container) return;


        container.innerHTML =
            "";


        for (
            let index = 0;
            index < cities.length;
            index++
        ) {

            const city =
                cities[index];


            try {

                const location =
                    await getCoordinates(
                        city
                    );


                const weather =
                    await getWeather(
                        location.latitude,
                        location.longitude
                    );


                const current =
                    weather.current;


                const info =
                    weatherInfo(
                        current.weather_code
                    );


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "city-card";


                card.innerHTML =
                    `

                    <h4>
                        ${city}
                    </h4>

                    <i
                        class="fa-solid ${info.icon} city-main-icon"
                    ></i>

                    <strong>
                        ${Math.round(current.temperature_2m)}°C
                    </strong>

                    <p>
                        ${info.text}
                    </p>

                    `;


                card.addEventListener(
                    "click",
                    function () {

                        if (citySearch) {

                            citySearch.value =
                                city;

                        }


                        loadCity(
                            city
                        );


                        window.location.hash =
                            "cuaca";

                    }
                );


                container.appendChild(
                    card
                );

            }

            catch (error) {

                console.log(
                    "City error:",
                    city,
                    error
                );

            }

        }


        if (
            !container.children.length
        ) {

            container.innerHTML =
                `

                <div class="loading-weather">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    <p>
                        Data kota gagal dimuat.
                    </p>

                </div>

                `;

        }

    }

    async function loadEarthquake() {

        const container =
            el(
                "earthquakeContainer"
            );


        if (!container) return;


        try {

            const response =
                await fetch(
                    "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
                );


            if (!response.ok) {

                throw new Error(
                    "BMKG tidak dapat diakses."
                );

            }


            const data =
                await response.json();


            const gempa =
                data.Infogempa.gempa;


            container.innerHTML =
                `

                <div class="earthquake-icon">

                    <i class="fa-solid fa-house-crack"></i>

                </div>

                <div>

                    <h3>
                        Gempa M ${gempa.Magnitude}
                    </h3>

                    <p>
                        ${gempa.Wilayah}
                    </p>

                    <p>
                        Kedalaman:
                        ${gempa.Kedalaman}
                    </p>

                    <p>
                        ${gempa.Tanggal}
                        ${gempa.Jam}
                    </p>

                    <p>
                        ${gempa.Potensi}
                    </p>

                </div>

                `;

        }

        catch (error) {

            console.log(
                "Gempa error:",
                error
            );


            container.innerHTML =
                `

                <div class="earthquake-icon">

                    <i class="fa-solid fa-house-crack"></i>

                </div>

                <div>

                    <h3>
                        Data gempa belum tersedia
                    </h3>

                    <p>
                        GameLab mungkin membatasi akses langsung
                        ke server BMKG.
                    </p>

                    <p>
                        Bagian website lainnya tetap dapat digunakan.
                    </p>

                </div>

                `;

        }

    }

    const contactForm =
        el(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                alert(
                    "Pesan berhasil dikirim."
                );


                contactForm.reset();

            }
        );

    }

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "show"
                                    );


                                revealObserver
                                    .unobserve(
                                        entry.target
                                    );

                            }

                        }
                    );

                },
                {
                    threshold:
                        0.1,

                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    }

    else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "show"
                );

            }
        );

    }

    function updateProgress() {

        const progress =
            el(
                "scrollProgress"
            );


        if (!progress) return;


        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        let percent = 0;


        if (
            documentHeight >
            0
        ) {

            percent =
                (
                    scrollTop /
                    documentHeight
                ) *
                100;

        }


        progress.style.width =
            percent +
            "%";

    }

    function parallax() {

        const heroBackground =
            el(
                "heroBackground"
            );


        if (!heroBackground) return;


        const scroll =
            window.scrollY;


        heroBackground.style.transform =
            "translateY(" +
            scroll *
            0.24 +
            "px) scale(1.2)";

    }

    function navbarScroll() {

        const navbar =
            el(
                "mainNavbar"
            );


        if (!navbar) return;


        navbar.classList.toggle(
            "navbar-scroll",
            window.scrollY >
            40
        );

    }

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-link-custom"
        );


    function scrollSpy() {

        let activeSection =
            "beranda";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop -
                    180;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    activeSection =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" +
                    activeSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }

    const backToTop =
        el(
            "backToTop"
        );


    function updateBackToTop() {

        if (!backToTop) return;


        backToTop.style.display =
            window.scrollY >
            500
                ? "grid"
                : "none";

    }


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo(
                    {
                        top:
                            0,

                        behavior:
                            "smooth"
                    }
                );

            }
        );

    }

    let ticking =
        false;


    window.addEventListener(
        "scroll",
        function () {

            if (!ticking) {

                window.requestAnimationFrame(
                    function () {

                        updateProgress();

                        parallax();

                        navbarScroll();

                        scrollSpy();

                        updateBackToTop();


                        ticking =
                            false;

                    }
                );


                ticking =
                    true;

            }

        },
        {
            passive:
                true
        }
    );

    updateMap();

    updateProgress();

    navbarScroll();

    scrollSpy();

    updateBackToTop();


    loadCity(
        "Jakarta"
    );


    loadCities();

    loadEarthquake();

});